"use server";

import { routeApi } from "@/src/shared/lib/api/route-api";
import {
  getAccessToken,
  getRefreshToken,
} from "@/src/shared/lib/auth/token-cookie";
import type {
  ExtractDataActionState,
  UploadFileActionState,
  UploadFileData,
  ExtractedDataResponse,
} from "./types/upload.types";

export async function uploadTransactionFileAction(
  _prevState: UploadFileActionState,
  formData: FormData,
): Promise<UploadFileActionState> {
  const file = formData.get("file");
  const userId = formData.get("user_id");

  if (!(file instanceof File) || file.size === 0) {
    return {
      success: false,
      message: "Lütfen yüklenecek bir dosya seçin.",
    };
  }

  if (typeof userId !== "string" || userId.length === 0) {
    return {
      success: false,
      message: "Kullanıcı bilgisi alınamadı. Lütfen tekrar giriş yapın.",
    };
  }

  const accessToken = await getAccessToken();
  const refreshToken = await getRefreshToken();

  const payload = new FormData();
  payload.append("user_id", userId);
  payload.append("file", file);

  const response = await routeApi<UploadFileData>({
    endpoint: "/api/transactions/file-input",
    method: "POST",
    body: payload,
    headers: {
      Authorization: `Bearer ${accessToken ?? ""}`,
    },
    refreshToken,
  });

  if (!response.success) {
    return {
      success: false,
      message: "Dosya yüklenirken bir hata oluştu. Lütfen tekrar deneyin.",
    };
  }

  return {
    success: true,
    message: "Dosya başarıyla yüklendi.",
    data: response.data,
  };
}

type ExtractTransactionDataInput = {
  inputId: string;
  fileName: string;
};

const EXTRACT_MAX_ATTEMPTS = 3;
const EXTRACT_RETRY_DELAYS_MS = [800, 1500];

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function extractTransactionDataAction({
  inputId,
  fileName,
}: ExtractTransactionDataInput): Promise<ExtractDataActionState> {
  if (!inputId) {
    return {
      success: false,
      message: "İşlem kimliği bulunamadı. Lütfen dosyayı tekrar yükleyin.",
    };
  }

  const accessToken = await getAccessToken();
  const refreshToken = await getRefreshToken();

  /**
   * Dosya yeni yüklendiği için backend ilk hızlı istekte henüz hazır
   * olmayabiliyor. Geçici hatalarda kısa bekleme ile birkaç kez tekrar deniyoruz.
   */
  for (let attempt = 0; attempt < EXTRACT_MAX_ATTEMPTS; attempt += 1) {
    const response = await routeApi<ExtractedDataResponse>({
      endpoint: "/api/transactions/extract",
      method: "POST",
      body: {
        input_id: inputId,
        file_name: fileName,
      },
      headers: {
        Authorization: `Bearer ${accessToken ?? ""}`,
      },
      refreshToken,
    });

    if (response.success) {
      return {
        success: true,
        message: "Veriler başarıyla çıkarıldı.",
        data: response.data,
      };
    }

    const retryDelay = EXTRACT_RETRY_DELAYS_MS[attempt];

    if (retryDelay !== undefined) {
      await delay(retryDelay);
    }
  }

  return {
    success: false,
    message: "Veriler çıkarılırken bir hata oluştu. Lütfen tekrar deneyin.",
  };
}
