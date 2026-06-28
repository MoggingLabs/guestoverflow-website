import { describe, expect, it } from "vitest";
import {
  missingRequired,
  normalizeIndustry,
  parseProspectsCsv,
} from "@/lib/outreach/prospects";

describe("normalizeIndustry", () => {
  it("maps variants (EN/PT) to canonical labels", () => {
    expect(normalizeIndustry("restaurant")).toBe("Restaurantes");
    expect(normalizeIndustry("Restaurante")).toBe("Restaurantes");
    expect(normalizeIndustry("hotel")).toBe("Hotéis");
    expect(normalizeIndustry("hostel")).toBe("Hotéis");
    expect(normalizeIndustry("barbearia")).toBe("Salões & Barbearias");
    expect(normalizeIndustry("salon")).toBe("Salões & Barbearias");
    expect(normalizeIndustry("Hotéis")).toBe("Hotéis");
    expect(normalizeIndustry("spaceship")).toBeNull();
  });
});

describe("parseProspectsCsv", () => {
  it("maps aliased headers, normalizes industry, keeps quoted commas", () => {
    const csv =
      'email,first_name,empresa,setor,cidade,canal,hook\n' +
      'Ana@X.pt,Ana,Garagem 33,restaurante,Vila Verde,Instagram,"172k, no IG"';
    const { prospects, error } = parseProspectsCsv(csv);
    expect(error).toBeUndefined();
    expect(prospects).toHaveLength(1);
    const p = prospects[0]!;
    expect(p.email).toBe("ana@x.pt"); // lowercased
    expect(p.firstName).toBe("Ana");
    expect(p.business).toBe("Garagem 33");
    expect(p.industry).toBe("Restaurantes");
    expect(p.fields.city).toBe("Vila Verde");
    expect(p.fields.channel).toBe("Instagram");
    expect(p.fields.hook).toBe("172k, no IG"); // comma inside quotes preserved
    expect(p.fields.businessName).toBe("Garagem 33"); // mirror for {{business}}
    expect(p.missing).toHaveLength(0);
  });

  it("flags missing required fields incl. unrecognized industry", () => {
    const { prospects } = parseProspectsCsv(
      "email,first_name,business,industry\nbob@x.pt,Bob,Bob Co,spaceship",
    );
    expect(prospects[0]!.missing).toContain("industry");
  });

  it("errors when there is no email column", () => {
    const { error } = parseProspectsCsv("name,business\nAna,Garagem");
    expect(error).toBeTruthy();
  });
});

describe("missingRequired", () => {
  it("passes a complete prospect and flags an incomplete one", () => {
    expect(
      missingRequired({
        email: "a@b.com",
        fields: { firstName: "A", business: "B", industry: "Hotéis" },
      }),
    ).toHaveLength(0);
    expect(
      missingRequired({ email: "bad", fields: { industry: "Hotéis" } }),
    ).toEqual(expect.arrayContaining(["email", "firstName", "business"]));
  });
});
