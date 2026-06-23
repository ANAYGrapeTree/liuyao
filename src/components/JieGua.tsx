// src/components/JieGua.tsx
import { PaiGuaResult } from '../types/paigua';
import { JieGuaResult } from '../types/jiehua';
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="mb-4 text-gray-600 hover:text-gray-800"
          >
            ← 返回排卦
          </button>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">解卦结果</h1>
          <div className="flex justify-center items-center space-x-4">
            <span className="text-lg text-gray-600">吉凶评分：</span>
            <span className={`text-2xl font-bold ${getTrendColor(result.trend)}`}>
              {result.score}
            </span>
            <span className={`text-lg font-semibold ${getTrendColor(result.trend)}`}>
              {result.trend}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">整体分析</h2>
            <p className="text-gray-600">{result.analysis.overallAnalysis}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">用神分析</h2>
            <p className="text-gray-600">{result.analysis.yongShenAnalysis}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">旺衰判断</h2>
            <p className="text-gray-600">{result.analysis.wangShuaiAnalysis}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">具体建议</h2>
            <ul className="space-y-2">
              {result.analysis.suggestions.map((suggestion, index) => (
                <li key={index} className="text-gray-600 flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">注意事项</h2>
            <ul className="space-y-2">
              {result.analysis.warnings.map((warning, index) => (
                <li key={index} className="text-gray-600 flex items-start">
                  <span className="text-red-500 mr-2">⚠</span>
                  {warning}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
