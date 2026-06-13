import { DebugAddress } from "next/dist/server/lib/utils";

export type FeaturesResponse = {
  mime_type: string;
  exif_present: boolean,
  camera_exif_tag_count: number;
  image_width: number;
  image_height: number;
  aspect_ratio: number;
  cv_width: number;
  cv_height: number;
  blur_score: number;
  edge_density: number;
  max_contour_area_ratio: number;
  has_document_contour: boolean;
  quadrilateral_count: number;
  axis_aligned_line_score: number;
};

export type ClassificationResponse = {
  kind: string;
  confidence: number;
  needs_ocr: boolean;
  needs_preprocessing: boolean;
  routing_key: string;
  features: FeaturesResponse;
  warnings: string[];
  model_version: string;
};

export type UploadFileResponse = {
  input_id: string;
  status: string;
  classification: ClassificationResponse;
  next_stage: string;
};

export type UploadFileInfo = {
  fileName: string;
  contentType: string;
  size: number;
  uploadedAt: string;
};

export type UploadFileData = {
  response: UploadFileResponse;
  file: UploadFileInfo;
};

export type UploadFileActionState = {
  success: boolean;
  message?: string;
  data?: UploadFileData;
};

export type ExtractDataActionState = {
  success: boolean;
  message?: string;
  data?: ExtractedDataResponse;
};

export type ExtractedDataResponse = {
  response: {
    input_id: string;
    status: string;
    result: ExtractedDataResponseResult;
    scores: Scores;
    warnings: string[];
  }
};

export type Scores = {
  summary: SummaryScore;
  rows: TransactionRows[];
};

export type TransactionRows = {
  transaction_id: string;
  score: number | null;
  extraction_confidence: number | null;
  field_confidence: number | null;
  completeness_score: number | null,
  validation_score: number | null,
  flags: string[]
};
export type SummaryScore = {
  overall_confidence: number | null,
  min_confidence: number | null,
  max_confidence: number | null,
  low_confidence_threshold: number | null,
  low_confidence_count: number | null,
  invalid_count: number | null,
  warning_count: number | null,
  validation_passed: boolean | null,
}

export type ExtractedDataResponseResult = {
  transactions: Transaction[];
  summary: Summary;
  debug: Debug;
};

export type Debug = {
  input_kind: null,
  document_currency: null,
  total_lines: null,
  transaction_count: number | null,
  low_confidence_count: number | null,
  extraction_method: string | null,
  normalization_version: string | null,
};

export type Transaction = {
  transaction_id: string;
  date: string | null,
  description: string | null,
  merchant: Merchant;
  amount: number | null,
  currency: string | null,
  original_amount: number | null,
  original_currency: string | null,
  direction: "credit" | "debit" | null;
  installment: Installment;
  source: Source;
  confidence: number | null;
  validation_status: "valid" | "invalid" | null;
  warnings: string[];
};

export type Merchant = {
  raw: string | null;
  normalized: string | null;
  display_name: string | null;
  confidence: number | null;
};

export type Installment = {
  current: number | null;
  total: number | null;
  raw: string | null;
  unit_amount: number | null;
  total_amount: number | null;
};

export type Source = {
  page: number | null;
  raw_confidence: number | null;
};

export type Summary = {
  transaction_count: number | null,
  duplicate_removed_count: number | null,
  total_debit: number | null,
  total_credit: number | null,
  net_amount: number | null,
  currencies: string[];
  primary_currency: string | null,
  low_confidence_count: number | null,
  invalid_count: number | null,
  warning_count: number | null,
  average_confidence: number | null,
};