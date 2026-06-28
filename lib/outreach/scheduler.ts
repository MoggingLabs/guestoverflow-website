/**
 * Sequence scheduling: enrolling a contact schedules step 0; after a step is
 * sent, the next step is scheduled relative to the send time. Idempotent via
 * the unique(enrollment_id, step_index) constraint on outreach_messages.
 */
import type { Sql } from "@/lib/db";
import * as repo from "./repo";

export function addHours(base: Date, hours: number): Date {
  return new Date(base.getTime() + hours * 3_600_000);
}

export type EnrollStatus = "scheduled" | "skipped_suppressed" | "no_steps";

export interface EnrollResult {
  enrollmentId: string;
  status: EnrollStatus;
}

/** Enroll a contact into a campaign and schedule step 0. Safe to call twice. */
export async function enrollContact(
  sql: Sql,
  campaignId: string,
  contactId: string,
  now: Date = new Date(),
): Promise<EnrollResult> {
  const contact = await repo.getContact(sql, contactId);
  if (!contact) throw new Error(`outreach contact ${contactId} not found`);

  // Compliance gate: never enroll a suppressed/unsubscribed contact.
  if (
    contact.unsubscribed_at ||
    (await repo.isSuppressed(sql, contact.email))
  ) {
    const enr = await repo.createOrGetEnrollment(sql, campaignId, contactId);
    await repo.stopEnrollment(sql, enr.id, "suppressed");
    return { enrollmentId: enr.id, status: "skipped_suppressed" };
  }

  const enr = await repo.createOrGetEnrollment(sql, campaignId, contactId);
  const step0 = await repo.getStep(sql, campaignId, 0);
  if (!step0) {
    await repo.completeEnrollment(sql, enr.id);
    return { enrollmentId: enr.id, status: "no_steps" };
  }

  if (enr.current_step < 0) {
    await repo.scheduleMessage(sql, {
      enrollmentId: enr.id,
      campaignId,
      contactId,
      stepIndex: 0,
      templateId: step0.template_id,
      toEmail: contact.email,
      dueAt: addHours(now, step0.delay_hours),
    });
    await repo.setEnrollmentStep(sql, enr.id, 0);
  }
  return { enrollmentId: enr.id, status: "scheduled" };
}

/** After step `sentStepIndex` is sent, schedule the next step or complete. */
export async function advanceAfterSend(
  sql: Sql,
  enrollment: repo.EnrollmentRow,
  sentStepIndex: number,
  sentAt: Date,
): Promise<void> {
  const nextIndex = sentStepIndex + 1;
  const nextStep = await repo.getStep(sql, enrollment.campaign_id, nextIndex);
  if (!nextStep) {
    await repo.completeEnrollment(sql, enrollment.id);
    return;
  }
  const contact = await repo.getContact(sql, enrollment.contact_id);
  if (!contact) {
    await repo.stopEnrollment(sql, enrollment.id, "contact_missing");
    return;
  }
  await repo.scheduleMessage(sql, {
    enrollmentId: enrollment.id,
    campaignId: enrollment.campaign_id,
    contactId: enrollment.contact_id,
    stepIndex: nextIndex,
    templateId: nextStep.template_id,
    toEmail: contact.email,
    dueAt: addHours(sentAt, nextStep.delay_hours),
  });
  await repo.setEnrollmentStep(sql, enrollment.id, nextIndex);
}
