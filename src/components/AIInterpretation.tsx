// src/components/AIInterpretation.tsx
import { useState } from 'react';
import { PaiGuaResult } from '../types/paigua';

interface AIInterpretationProps {
  paiguaResult: PaiGuaResult;
  question: string;
  questionType: string;
  onBack: () => void;
}

export function AIInterpretation({ paiguaResult, question, questionType, onBack }: AIInterpretationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [interpretation, setInterpretation] = useState('');

  const generateInterpretation = async () => {
    setIsLoading(true);
    setInterpretation('');
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setInterpretation(`
      根据您的卦象分析：
      
      问题：${question}
      类型：${questionType}
      
      卦象显示，当前运势较为平稳。用神得力，预示着事情会向好的方向发展。
      
      建议：
      1. 保持积极心态
      2. 把握时机
      3. 注意细节
      
      总体评分：75分（良好）
    `);
    
    setIsLoading(false);
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
              AI解读
            </h1>
          </div>
          
          <div className="card mb-8 animate-slide-up">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">🤖</span>
              </div>
              <h2 className="text-xl font-semibold text-neutral-800 mb-2 font-serif">
                AI智能解读
              </h2>
              <p className="text-neutral-600">
                基于您的卦象，AI将为您提供详细的解读
              </p>
            </div>
            
            {!interpretation && !isLoading && (
              <div className="text-center">
                <button
                  onClick={generateInterpretation}
                  className="btn btn-primary"
                >
                  开始解读
                </button>
              </div>
            )}
            
            {isLoading && (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
                <p className="text-neutral-600">AI正在分析您的卦象...</p>
              </div>
            )}
            
            {interpretation && (
              <div className="animate-fade-in">
                <div className="bg-neutral-50 rounded-lg p-6 whitespace-pre-wrap text-neutral-700">
                  {interpretation}
                </div>
                
                <div className="mt-6 text-center">
                  <button
                    onClick={generateInterpretation}
                    className="btn btn-outline mr-4"
                  >
                    重新解读
                  </button>
                  <button
                    onClick={onBack}
                    className="btn btn-ghost"
                  >
                    返回
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
