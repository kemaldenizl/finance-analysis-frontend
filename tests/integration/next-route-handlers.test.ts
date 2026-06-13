// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import type { LoginResponse } from "@/src/features/auth/login/types/login.types";
import type { UploadFileData } from "@/src/features/analysis/ai-upload/types/upload.types";

describe("Next route handlers with backend MSW", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv("API_BASE_URL", "http://backend.test");
  });

  it("submits login credentials through the Next API route to the backend", async () => {
    const { POST } = await import("@/src/app/api/auth/login/route");
    const request = new NextRequest("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: "demo@finpilot.test",
        password: "StrongPassword1!",
      }),
    });

    const response = await POST(request);
    const payload = (await response.json()) as {
      success: true;
      status: number;
      data: LoginResponse;
    };

    expect(response.status).toBe(200);
    expect(payload.success).toBe(true);
    expect(payload.data.user.email).toBe("demo@finpilot.test");
  });

  it("forwards file uploads as FormData through the Next API route", async () => {
    const { POST } = await import("@/src/app/api/transactions/file-input/route");
    const formData = new FormData();
    formData.set("user_id", "user-1");
    formData.set(
      "file",
      new File(["ekstre"], "ekstre-ocak.pdf", { type: "application/pdf" }),
    );
    const request = new NextRequest("http://localhost:3000/api/transactions/file-input", {
      method: "POST",
      headers: {
        Authorization: "Bearer access-token",
        "Refresh-Token": "refresh-token",
      },
      body: formData,
    });

    const response = await POST(request);
    const payload = (await response.json()) as {
      success: true;
      status: number;
      data: UploadFileData;
    };

    expect(response.status).toBe(200);
    expect(payload.success).toBe(true);
    expect(payload.data.file.fileName).toBe("ekstre-ocak.pdf");
    expect(payload.data.response.input_id).toBe("input-1");
  });

  it("starts MFA setup through the backend route", async () => {
    const { POST } = await import("@/src/app/api/auth/mfa/create/route");
    const request = new NextRequest("http://localhost:3000/api/auth/mfa/create", {
      method: "POST",
      headers: {
        Authorization: "Bearer access-token",
      },
    });

    const response = await POST(request);
    const payload = (await response.json()) as {
      success: true;
      status: number;
      data: {
        manualEntryKey: string;
        otpAuthUri: string;
      };
    };

    expect(response.status).toBe(200);
    expect(payload.success).toBe(true);
    expect(payload.data.manualEntryKey).toBe("JBSWY3DPEHPK3PXP");
  });
});
