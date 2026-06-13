import { NextRequest, NextResponse } from "next/server";
import { serverApi } from "@/src/shared/lib/api/server-api";

export async function POST(request: NextRequest) {
  const refreshToken = request.headers.get("Refresh-Token");

  const incoming = await request.formData();
  const userId = incoming.get("user_id");
  const file = incoming.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { success: false, status: 400, error: "Dosya bulunamadı." },
      { status: 400 },
    );
  }

  const formData = new FormData();
  formData.append("user_id", String(userId ?? ""));
  formData.append("file", file);

  const response = await serverApi({
    endpoint: "/api/transactions/file-input",
    method: "POST",
    body: formData,
    headers: {
      Authorization: request.headers.get("Authorization") ?? "",
    },
    authRetry: true,
    refreshToken,
    link: true,
  });

  return NextResponse.json(response, { status: response.status });
}
