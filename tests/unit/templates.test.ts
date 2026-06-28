import { describe, expect, it } from "vitest";
import {
  applyVars,
  contactMergeVars,
  escapeHtml,
  renderEmail,
} from "@/lib/outreach/templates";

describe("applyVars", () => {
  it("substitutes merge tokens and tolerates whitespace", () => {
    expect(applyVars("Hi {{firstName}} at {{ business }}!", {
      firstName: "Ana",
      business: "Garagem 33",
    })).toBe("Hi Ana at Garagem 33!");
  });

  it("replaces unknown tokens with empty string", () => {
    expect(applyVars("Hello {{missing}}.", {})).toBe("Hello .");
  });

  it("escapes HTML in values when asked", () => {
    expect(
      applyVars("{{name}}", { name: "<b>x</b> & co" }, { escapeHtml: true }),
    ).toBe("&lt;b&gt;x&lt;/b&gt; &amp; co");
  });
});

describe("escapeHtml", () => {
  it("escapes the five significant characters", () => {
    expect(escapeHtml(`<>&"'`)).toBe("&lt;&gt;&amp;&quot;&#39;");
  });
});

describe("contactMergeVars", () => {
  it("derives firstName from name", () => {
    const vars = contactMergeVars({
      email: "ana@example.com",
      name: "Ana Silva",
      business_name: "Garagem 33",
    });
    expect(vars.firstName).toBe("Ana");
    expect(vars.business).toBe("Garagem 33");
    expect(vars.email).toBe("ana@example.com");
  });

  it("handles missing name gracefully", () => {
    const vars = contactMergeVars({ email: "x@y.com" });
    expect(vars.firstName).toBe("");
    expect(vars.name).toBe("");
  });

  it("merges custom fields", () => {
    const vars = contactMergeVars({
      email: "x@y.com",
      fields: { city: "Vila Verde" },
    });
    expect(vars.city).toBe("Vila Verde");
  });
});

describe("renderEmail", () => {
  const tpl = {
    subject: "Quick idea for {{business}}",
    bodyHtml: "<p>Hi {{firstName}}, we built something for {{business}}.</p>",
    bodyText: "Hi {{firstName}}, we built something for {{business}}.",
  };
  const vars = contactMergeVars({
    email: "ana@example.com",
    name: "Ana Silva",
    business_name: "Garagem 33",
  });
  const unsub = "https://guestoverflow.com/api/outreach/unsubscribe?token=abc";

  it("merges the subject", () => {
    const out = renderEmail(tpl, vars, unsub);
    expect(out.subject).toBe("Quick idea for Garagem 33");
  });

  it("wraps html and includes a working unsubscribe link", () => {
    const out = renderEmail(tpl, vars, unsub);
    expect(out.html).toContain("Hi Ana, we built something for Garagem 33.");
    expect(out.html).toContain(unsub);
    expect(out.html.toLowerCase()).toContain("unsubscribe");
  });

  it("appends a plain-text unsubscribe footer", () => {
    const out = renderEmail(tpl, vars, unsub);
    expect(out.text).toContain("Hi Ana, we built something for Garagem 33.");
    expect(out.text).toContain(`Unsubscribe: ${unsub}`);
  });
});
