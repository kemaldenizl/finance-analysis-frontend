import { describe, expect, it } from "vitest";
import { maskEmail } from "@/src/shared/lib/auth/mask-email";

describe("maskEmail", () => {
  it("keeps the first two local-part characters visible and masks the rest", () => {
    expect(maskEmail("ayse.yilmaz@example.com")).toBe("ay*********@example.com");
  });

  it("returns the original value when the email shape is invalid", () => {
    expect(maskEmail("not-an-email")).toBe("not-an-email");
  });
});
