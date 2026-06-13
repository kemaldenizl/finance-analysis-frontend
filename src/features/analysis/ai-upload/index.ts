export {
  uploadTransactionFileAction,
  extractTransactionDataAction,
} from "./actions";
export const UPLOAD_RESULT_STORAGE_KEY = "dosya-yukle-result";
export const EXTRACT_RESULT_STORAGE_KEY = "dosya-yukle-veriler-result";
export type {
  ExtractDataActionState,
  UploadFileActionState,
  UploadFileData,
  UploadFileInfo,
  UploadFileResponse,
} from "./types/upload.types";
