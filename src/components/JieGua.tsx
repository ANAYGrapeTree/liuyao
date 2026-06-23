// src/components/JieGua.tsx
import type { PaiGuaResult } from '../types/paigua';
import { jiehua } from '../utils/jiehua';

interface JieGuaProps {
  paiguaResult: PaiGuaResult;
  questionType: string;
  onBack: () => void;
}

export function JieGua({ paiguaResult, questionType, onBack }: JieGuaProps) {
  const result = jiehua(paiguaResult, questionType);
  
  const getTrendColor = (trend: string) => {
    switch (trend) {
      case '吉':
        return 'text-green-600';
      case '凶':
        return 'text-red-600';
      default:
        return 'text-yellow-600';
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="container-responsive section">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-8 animate-fade-in">
            <button
              onClick={onBack}
              className="btn btn-ghost mr-4"
            >
              ← 返回
            </button>
            <h1 className="text-3xl font-bold text-neutral-800 font-serif">
              解卦
            </h1>
          </div>
          
          <div className="card mb-8 animate-slide-up">
            <div className="text-center mb-8">
              <div className="flex justify-center items-center space-x-4">
                <span className="text-lg text-neutral-600">吉凶评分：</span>
                <span className={`text-2xl font-bold ${getTrendColor(result.trend)}`}>
                  {result.score}
                </span>
                <span className={`text-lg font-semibold ${getTrendColor(result.trend)}`}>
                  {result.trend}
                </span>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-neutral-700 mb-2">用神分析</h3>
                <p className="text-neutral-600">
                  {result.analysis.yongShenAnalysis}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-neutral-700 mb-2">旺衰判断</h3>
                <p className="text-neutral-600">
                  {result.analysis.wangShuaiAnalysis}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-neutral-700 mb-2">具体建议</h3>
                <ul className="space-y-2">
                  {result.analysis.suggestions.map((suggestion, index) => (
                    <li key={index} className="text-neutral-600 flex items-start">
                      <span className="text-secondary-500 mr-2">✓</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-neutral-700 mb-2">注意事项</h3>
                <ul className="space-y-2">
                  {result.analysis.warnings.map((warning, index) => (
                    <li key={index} className="text-neutral-600 flex items-start">
                      <span className="text-accent-500 mr-2">⚠</span>
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="text-center animate-slide-up">
            <button
              onClick={() => {}}
              className="btn btn-accent"
            >
              获取AI解读
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}