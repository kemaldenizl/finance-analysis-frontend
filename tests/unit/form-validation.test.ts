import { describe, expect, it } from "vitest";
import { z } from "zod";
import { formDataToObject, validateFormData } from "@/src/shared/lib/validation/form-validation.ts";

describe("form validation helpers", () => {
  it("collects repeated form fields as arrays for user-submitted values", () => {
    const formData = new FormData();
    formData.append("category", "market");
    formData.append("category", "ulasim");

    expect(formDataToObject(formData)).toEqual({
      category: ["market", "ulasim"],
    });
  });

  it("returns field errors when form data does not match the schema", () => {
    const schema = z.object({
      email: z.string().email("Geçerli bir email adresi gir."),
    });
    const formData = new FormData();
    formData.set("email", "hatali-email");

    const result = validateFormData(schema, formData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.email).toContain("Geçerli bir email adresi gir.");
    }
  });
});
