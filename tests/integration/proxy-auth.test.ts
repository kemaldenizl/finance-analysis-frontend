// @vitest-environment node
import { describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { getRedirectUrl } from "next/experimental/testing/server";
import { proxy } from "@/src/proxy";
import { requestTokenRefresh } from "@/src/features/auth/refresh/refresh.service";

vi.mock("@/src/features/auth/refresh/refresh.service", () => ({
  requestTokenRefresh: vi.fn(),
}));

const mockedRequestTokenRefresh = vi.mocked(requestTokenRefresh);

describe("proxy protected-route and cookie flow", () => {
  it("redirects anonymous users away from protected routes", async () => {
    const request = new NextRequest("http://localhost:3000/profil");

    const response = await proxy(request);

    expect(getRedirectUrl(response)).toBe("http://localhost:3000/giris-yap");
  });

  it("redirects authenticated users away from auth-only routes", async () => {
    const request = new NextRequest("http://localhost:3000/giris-yap", {
      headers: {
        cookie: "access_token=access-token",
      },
    });

    const response = await proxy(request);

    expect(getRedirectUrl(response)).toBe("http://localhost:3000/");
  });

  it("refreshes cookies when only the refresh token is present", async () => {
    mockedRequestTokenRefresh.mockResolvedValueOnce({
      tokens: {
        accessToken: "new-access-token",
        accessTokenExpiresAtUtc: "2030-01-01T00:00:00.000Z",
        refreshToken: "new-refresh-token",
        refreshTokenExpiresAtUtc: "2030-02-01T00:00:00.000Z",
      },
    });
    const request = new NextRequest("http://localhost:3000/profil", {
      headers: {
        cookie: "refresh_token=refresh-token",
      },
    });

    const response = await proxy(request);

    expect(getRedirectUrl(response)).toBeNull();
    expect(response.cookies.get("access_token")?.value).toBe("new-access-token");
    expect(response.cookies.get("refresh_token")?.value).toBe("new-refresh-token");
  });
});
