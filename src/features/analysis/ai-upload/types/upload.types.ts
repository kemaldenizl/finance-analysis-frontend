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
