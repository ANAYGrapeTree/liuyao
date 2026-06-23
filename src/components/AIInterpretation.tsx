// src/components/AIInterpretation.tsx
import { useState } from 'react';
import type { AIConfig, AIInterpretationRequest, AIInterpretationResponse } from '../types/ai';
import type { PaiGuaResult } from '../types/paigua';
import { interpretWithAI } from '../utils/ai';

interface AIInterpretationProps {
  paiguaResult: PaiGuaResult;
  question: string;
  questionType: string;
  onBack: () => void;
}

export function AIInterpretation({ paiguaResult, question, questionType, onBack }: AIInterpretationProps) {
  const [config, setConfig] = useState<AIConfig>({
    useMimoApi: false,
    mimoApiKey: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AIInterpretationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleInterpret = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const request: AIInterpretationRequest = {
        guaData: paiguaResult.guaData,
        question,
        questionType,
        paiguaResult
      };
      
      const response = await interpretWithAI(config, request);
      setResult(response);
    } catch {
      setError('解读失败，请稍后重试');
    } finally {
      setIsLoading(false);
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
            
            <div className="space-y-4 mb-6">
              <div
                onClick={() => setConfig(prev => ({ ...prev, useMimoApi: false }))}
                className={`
                  p-4 rounded-lg cursor-pointer border-2 transition-all
                  ${!config.useMimoApi
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-neutral-200 hover:border-neutral-300'
                  }
                `}
              >
                <div className="flex items-center">
                  <div className={`
                    w-4 h-4 rounded-full border-2 mr-3
                    ${!config.useMimoApi ? 'border-primary-500 bg-primary-500' : 'border-neutral-300'}
                  `} />
                  <div>
                    <h3 className="font-semibold text-neutral-800">使用免费API</h3>
                    <p className="text-sm text-neutral-600">无需配置，直接使用</p>
                  </div>
                </div>
              </div>
              
              <div
                onClick={() => setConfig(prev => ({ ...prev, useMimoApi: true }))}
                className={`
                  p-4 rounded-lg cursor-pointer border-2 transition-all
                  ${config.useMimoApi
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-neutral-200 hover:border-neutral-300'
                  }
                `}
              >
                <div className="flex items-center">
                  <div className={`
                    w-4 h-4 rounded-full border-2 mr-3
                    ${config.useMimoApi ? 'border-primary-500 bg-primary-500' : 'border-neutral-300'}
                  `} />
                  <div>
                    <h3 className="font-semibold text-neutral-800">使用MIMO API</h3>
                    <p className="text-sm text-neutral-600">使用您自己的API密钥</p>
                  </div>
                </div>
                
                {config.useMimoApi && (
                  <div className="mt-4">
                    <label className="label">
                      API密钥
                    </label>
                    <input
                      type="password"
                      value={config.mimoApiKey}
                      onChange={(e) => setConfig(prev => ({ ...prev, mimoApiKey: e.target.value }))}
                      placeholder="请输入您的MIMO API密钥"
                      className="input"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <button
              onClick={handleInterpret}
              disabled={isLoading || (config.useMimoApi && !config.mimoApiKey)}
              className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '解读中...' : '开始AI解读'}
            </button>
          </div>
          
          {error && (
            <div className="card mb-8 bg-red-50 border-red-200 animate-slide-up">
              <p className="text-red-600">{error}</p>
            </div>
          )}
          
          {result && (
            <div className="card animate-slide-up">
              <h2 className="text-xl font-semibold text-neutral-800 mb-6 font-serif">
                解读结果
              </h2>
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap text-neutral-600">{result.content}</pre>
              </div>
              
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => {
                    const blob = new Blob([result.content], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `六爻解读_${new Date().toISOString().split('T')[0]}.txt`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="btn btn-secondary"
                >
                  保存解读
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
