// src/types/jiehua.ts
export interface JieGuaAnalysis {
  overallAnalysis: string;
  yongShenAnalysis: string;
  wangShuaiAnalysis: string;
  suggestions: string[];
  warnings: string[];
}

export interface JieGuaResult {
  analysis: JieGuaAnalysis;
  score: number;
  trend: '吉' | '凶' | '平';
}
