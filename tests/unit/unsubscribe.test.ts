import { describe, expect, it } from "vitest";
import {
  buildUnsubscribeUrl,
  unsubscribeToken,
  verifyUnsubscribeToken,
} from "@/lib/outreach/unsubscribe";

const SECRET = "test-secret";

describe("unsubscribe tokens", () => {
  it("round-trips an email (normalized to lowercase)", () => {
    const token = unsubscribeToken("Ana@Example.com", SECRET);
    expect(verifyUnsubscribeToken(token, SECRET)).toBe("ana@example.com");
  });

  it("rejects a tampered token", () => {
    const token = unsubscribeToken("ana@example.com", SECRET);
    const tampered = `${token}x`;
    expect(verifyUnsubscribeToken(tampered, SECRET)).toBeNull();
  });

  it("rejects a token signed with a different secret", () => {
    const token = unsubscribeToken("ana@example.com", SECRET);
    expect(verifyUnsubscribeToken(token, "other-secret")).toBeNull();
  });

  it("rejects malformed input", () => {
    expect(verifyUnsubscribeToken("", SECRET)).toBeNull();
    expect(verifyUnsubscribeToken("no-dot", SECRET)).toBeNull();
    expect(verifyUnsubscribeToken(".sig", SECRET)).toBeNull();
  });

  it("builds an unsubscribe URL carrying a verifiable token", () => {
    const url = buildUnsubscribeUrl(
      "https://guestoverflow.com",
      "ana@example.com",
      SECRET,
    );
    expect(url).toContain("/api/outreach/unsubscribe?token=");
    const token = decodeURIComponent(url.split("token=")[1]!);
    expect(verifyUnsubscribeToken(token, SECRET)).toBe("ana@example.com");
  });
});
