import { z } from "zod";

export const aiAnalysisSchema = z.object({
  
});

export type AiAnalysisSchema = z.infer<typeof aiAnalysisSchema>;