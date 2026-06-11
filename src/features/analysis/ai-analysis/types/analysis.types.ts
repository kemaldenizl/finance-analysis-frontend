export type TransactionFormRow = {
    transaction_id: string;
    date: string;
    description: string;
    merchant: NormalizedMerchant;
    amount: string;
    currency: string;
    direction: TransactionDirection;
};

export type NormalizedMerchant = {
    normalized: string;
}

export type TransactionDirection = "debit" | "credit";

export type AnalysisActionState = {
    success: boolean;
    message?: string;
    data?: AnalysisResponse;
};

export type AnalysisResponse = {
    response: {
        input_id: string;
        analysis_id: string | null;
        status: AnalysisStatus;
        result: AnalysisResult;
        quality: QualityInfo;
        engine: EngineInfo;
        warnings: WarningCode[];
    }
};

export type AnalysisStatus = "completed" | "failed" | "partial";

export type AnalysisResult = {
  categorization: CategorizationResult;
  spending_profile: SpendingProfile;
  anomalies: AnomalyResult;
  forecast: ForecastResult;
  installment_recommendation: InstallmentRecommendation;
  assistant: AssistantAnswer;
  executive_summary: string[];
};

export type CategorizationResult = {
  transactions?: CategorizedTransaction[];
  summary: CategorySummaryItem[];
  uncategorized_count: number;
  rule_assisted_count: number;
  embedding_assisted_count: number;
  llm_assisted_count: number;
};

export type CategorizedMerchant = {
  raw?: string | null;
  normalized?: string | null;
  display_name?: string | null;
};

export type CategorizedTransaction = {
  transaction_id?: string;
  date?: string | null;
  description?: string | null;
  merchant?: CategorizedMerchant | string | null;
  amount?: number | string | null;
  currency?: string | null;
  category?: TransactionCategory | null;
  subcategory?: string | null;
  confidence?: number | null;
  category_confidence?: number | null;
  direction?: TransactionDirection | null;
};

export type CategorySummaryItem = {
  category: TransactionCategory;
  transaction_count: number;
  total_amount: number;
  /**
   * 0-1 arası oran.
   * Örn: 0.7273 => %72.73
   */
  share_of_spend: number;
};

export type TransactionCategory =
  | "travel"
  | "food"
  | "shopping"
  | "entertainment"
  | "gaming"
  | "transport"
  | "bills"
  | "health"
  | "education"
  | "other"
  | string;

export type SpendingProfile = {
  labels: SpendingProfileLabel[];
  primary_category: TransactionCategory;
  primary_category_share: number;
  installment_transaction_ratio: number;
  foreign_currency_transaction_ratio: number;
  average_transaction_amount: number;
  largest_transaction_amount: number;
  observations: string[];
};

export type SpendingProfileLabel =
  | "travel_heavy_spender"
  | "food_heavy_spender"
  | "shopping_heavy_spender"
  | "entertainment_heavy_spender"
  | "balanced_spender"
  | string;

export type AnomalyResult = {
  anomaly_count: number;
  method: AnomalyMethod;
  items: AnomalyItem[];
  observations: string[];
  llm_explanation: string;
  explanation_method: ExplanationMethod;
};

export type AnomalyMethod =
  | "pyod_ecod_v1"
  | "z_score"
  | "iqr"
  | "isolation_forest"
  | string;

export type AnomalyItem = {
  transaction_id: string;
  anomaly_type: AnomalyType;
  severity: RiskLevel;
  score: number;
  message: string;
  amount: number;
  currency: CurrencyCode;
  merchant: string;
};

export type AnomalyType =
  | "pyod_outlier_score"
  | "amount_outlier"
  | "merchant_outlier"
  | "category_outlier"
  | string;

export type ForecastResult = {
  status: AnalysisStatus;
  method: ForecastMethod;
  historical_month_count: number;
  predicted_next_month_spend: number;
  currency: CurrencyCode;
  confidence: number;
  observations: string[];
};

export type ForecastMethod =
  | "pytorch_transformer_encoder_v1"
  | "moving_average"
  | "linear_regression"
  | "arima"
  | string;

export type InstallmentRecommendation = {
  status: AnalysisStatus;
  requested_amount: number;
  currency: CurrencyCode;
  baseline_monthly_spend: number;
  forecast_monthly_spend: number;
  forecast_method: ForecastMethod;
  recommended_months: number;
  options: InstallmentOption[];
  explanation: string;
  explanation_method: ExplanationMethod;
  warnings: WarningCode[];
};

export type InstallmentOption = {
  months: number;
  monthly_amount: number;
  monthly_burden_ratio: number;
  risk_level: RiskLevel;
};

export type RiskLevel = "low" | "medium" | "high" | string;

export type AssistantAnswer = {
  question: string;
  answer: string;
  intent: AssistantIntent;
  generation_method: GenerationMethod;
};

export type AssistantIntent =
  | "anomaly_question"
  | "forecast_question"
  | "installment_question"
  | "spending_profile_question"
  | "general_question"
  | string;

export type GenerationMethod =
  | "qwen_llm_context_answer_v1"
  | string;

export type ExplanationMethod =
  | "qwen_llm_explanation_v1"
  | string;

export type QualityInfo = {
  source_overall_confidence: number;
  usable_transaction_count: number;
  low_confidence_transaction_count: number;
  invalid_transaction_count: number;
  analysis_confidence: number;
  warnings: WarningCode[];
};

export type EngineInfo = {
  analysis_version: string;
  llm_enabled: boolean;
  llm_available: boolean;
  llm_model: string;
  embedding_enabled: boolean;
  embedding_model: string;
  anomaly_method: AnomalyMethod;
  forecast_method: ForecastMethod;
};

export type WarningCode =
  | "recommendation_is_spending_burden_estimate_not_credit_advice"
  | string;

export type CurrencyCode =
  | "TRY"
  | "USD"
  | "EUR"
  | "GBP"
  | string;

