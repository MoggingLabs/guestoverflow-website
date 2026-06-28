/**
 * The claim-and-send tick — the heart of the automatic outreach engine.
 *
 * One tick: claim due messages (FOR UPDATE SKIP LOCKED), and for each render
 * the template, enforce the compliance gate (paused campaign / unsubscribe /
 * suppression), send via the email port, log the result, and schedule the
 * next sequence step. Failures retry with quadratic backoff up to
 * config.maxAttempts. Pure with respect to its deps, so tests drive it with a
 * real DB + a fake/SMTP email port and an injectable clock.
 */
import type { Sql } from "@/lib/db";
import type { OutreachConfig } from "./config";
import type { EmailPort } from "./email";
import * as repo from "./repo";
import { advanceAfterSend } from "./scheduler";
import { contactMergeVars, renderEmail } from "./templates";
import { buildUnsubscribeUrl } from "./unsubscribe";

export interface TickDeps {
  sql: Sql;
  email: EmailPort;
  config: OutreachConfig;
  /** Injectable clock for tests. */
  now?: () => Date;
}

export interface TickResult {
  claimed: number;
  sent: number;
  skipped: number;
  failed: number;
  deferred: number;
}

function backoffDueAt(now: Date, attempts: number): Date {
  const minutes = Math.min(attempts * attempts, 60); // 1, 4, 9, 16, 25 … capped at 60
  return new Date(now.getTime() + minutes * 60_000);
}

export async function tick(deps: TickDeps): Promise<TickResult> {
  const { sql, email, config } = deps;
  const clock = deps.now ?? (() => new Date());
  const result: TickResult = {
    claimed: 0,
    sent: 0,
    skipped: 0,
    failed: 0,
    deferred: 0,
  };

  const claimed = await repo.claimDueMessages(sql, config.batchSize);
  result.claimed = claimed.length;

  for (const msg of claimed) {
    try {
      const campaign = await repo.getCampaign(sql, msg.campaign_id);
      if (!campaign || campaign.status === "archived") {
        await repo.markMessageSkipped(sql, msg.id, "campaign_unavailable");
        result.skipped += 1;
        continue;
      }
      // Paused/draft: re-arm for later without consuming an attempt.
      if (campaign.status !== "active") {
        await repo.deferMessage(
          sql,
          msg.id,
          new Date(clock().getTime() + 30 * 60_000),
        );
        result.deferred += 1;
        continue;
      }

      const contact = await repo.getContact(sql, msg.contact_id);
      if (!contact) {
        await repo.markMessageSkipped(sql, msg.id, "contact_missing");
        result.skipped += 1;
        continue;
      }

      // Compliance gate at send time (defends against a race with unsubscribe).
      if (
        contact.unsubscribed_at ||
        (await repo.isSuppressed(sql, contact.email))
      ) {
        await repo.markMessageSkipped(sql, msg.id, "suppressed");
        await repo.stopEnrollmentsForContact(sql, contact.id, "unsubscribed");
        await repo.recordSend(sql, {
          messageId: msg.id,
          campaignId: campaign.id,
          contactId: contact.id,
          toEmail: contact.email,
          subject: null,
          providerMessageId: null,
          status: "skipped",
          error: "suppressed",
        });
        result.skipped += 1;
        continue;
      }

      const template = await repo.getTemplate(sql, msg.template_id);
      if (!template) {
        await repo.markMessageSkipped(sql, msg.id, "template_missing");
        result.skipped += 1;
        continue;
      }

      const unsubscribeUrl = buildUnsubscribeUrl(
        config.siteUrl,
        contact.email,
        config.secret,
      );
      const rendered = renderEmail(
        {
          subject: template.subject,
          bodyHtml: template.body_html,
          bodyText: template.body_text,
        },
        contactMergeVars(contact),
        unsubscribeUrl,
      );

      const receipt = await email.send({
        to: contact.email,
        from: campaign.from_email ?? config.fromEmail,
        replyTo: campaign.reply_to ?? config.replyTo,
        subject: rendered.subject,
        html: rendered.html,
        text: rendered.text,
        headers: {
          "List-Unsubscribe": `<${unsubscribeUrl}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      });

      await repo.markMessageSent(
        sql,
        msg.id,
        receipt.providerMessageId,
        rendered.subject,
      );
      await repo.recordSend(sql, {
        messageId: msg.id,
        campaignId: campaign.id,
        contactId: contact.id,
        toEmail: contact.email,
        subject: rendered.subject,
        providerMessageId: receipt.providerMessageId,
        status: "sent",
      });

      const enrollment = await repo.getEnrollment(sql, msg.enrollment_id);
      if (enrollment) {
        await advanceAfterSend(sql, enrollment, msg.step_index, clock());
      }
      result.sent += 1;
    } catch (err) {
      const error = (err instanceof Error ? err.message : String(err)).slice(
        0,
        500,
      );
      const attempts = msg.attempts + 1;
      const outcome = await repo.recordMessageFailure(
        sql,
        msg.id,
        attempts,
        config.maxAttempts,
        error,
        backoffDueAt(clock(), attempts),
      );
      if (outcome === "failed") {
        await repo.recordSend(sql, {
          messageId: msg.id,
          campaignId: msg.campaign_id,
          contactId: msg.contact_id,
          toEmail: msg.to_email,
          subject: null,
          providerMessageId: null,
          status: "failed",
          error,
        });
        result.failed += 1;
      } else {
        result.deferred += 1;
      }
    }
  }

  return result;
}
