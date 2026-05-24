import { supabase } from "@/integrations/supabase/client";
import type { ScoreReport } from "./psychometricData";
import type { QualityReport } from "./responseQuality";

export interface AIInterpretation {
  consistencyVerdict: "high" | "medium" | "low";
  consistencyExplanation: string;
  riasecNarrative: string;
  miNarrative: string;
  aptitudeNarrative: string;
  recommendedStreams: { slug: string; fitRationale: string }[];
  recommendedCareers: { name: string; fitRationale: string; watchOuts: string }[];
  developmentSuggestions: string[];
  parentTalkingPoints: string[];
  redFlags: string[];
}

export interface InterpretationResponse {
  interpretation: AIInterpretation;
  model: string;
  generatedAt: string;
}

export async function fetchInterpretation(input: {
  student: { name: string; grade: string; age?: string; gradeBand?: string };
  report: ScoreReport;
  quality: QualityReport;
  deterministicStreams: string[];
}): Promise<InterpretationResponse> {
  const { data, error } = await supabase.functions.invoke("interpret-report", { body: input });
  if (error) throw error;
  if ((data as { error?: string })?.error) throw new Error((data as { error: string }).error);
  return data as InterpretationResponse;
}
