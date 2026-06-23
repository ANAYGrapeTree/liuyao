// src/types/ai.ts
import type { GuaData, PaiGuaResult } from './paigua';

export interface AIConfig {
  useMimoApi: boolean;
  mimoApiKey: string;
}

export interface AIInterpretationRequest {
  guaData: GuaData;
  question: string;
  questionType: string;
  paiguaResult: PaiGuaResult;
}

export interface AIInterpretationResponse {
  content: string;
  timestamp: number;
}
