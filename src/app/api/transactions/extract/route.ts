import { NextRequest, NextResponse } from "next/server";
import { serverApi } from "@/src/shared/lib/api/server-api";
import { ExtractedDataResponse } from "@/src/features/analysis/ai-upload/types/upload.types";

export async function POST(request: NextRequest) {
  const refreshToken = request.headers.get("Refresh-Token");

  const incoming = await request.json().catch(() => null);
  const inputId = incoming?.input_id;
  const fileName = incoming?.file_name;

  if (typeof inputId !== "string" || inputId.length === 0) {
    return NextResponse.json(
      { success: false, status: 400, error: "input_id bulunamadı." },
      { status: 400 },
    );
  }

  const response = await serverApi<ExtractedDataResponse>({
    endpoint: "/api/transactions/file-extract",
    method: "POST",
    body: {
      input_id: inputId,
      file_name: fileName,
    },
    headers: {
      Authorization: request.headers.get("Authorization") ?? "",
    },
    authRetry: true,
    refreshToken,
  });

  return NextResponse.json(response, { status: response.status });
}
