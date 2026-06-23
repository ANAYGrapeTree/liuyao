// src/components/AIInterpretation.tsx
import { useState } from 'react';
import { AIConfig, AIInterpretationRequest, AIInterpretationResponse } from '../types/ai';
import { PaiGuaResult } from '../types/paigua';
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
    } catch (err) {
      setError('解读失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSave = () => {
    if (result) {
      const blob = new Blob([result.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `六爻解读_${new Date().toISOString().split('T')[0]}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="mb-4 text-gray-600 hover:text-gray-800"
          >
            ← 返回解卦
          </button>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">AI解读</h1>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">选择解读方式</h2>
          
          <div className="space-y-4">
            <div
              onClick={() => setConfig(prev => ({ ...prev, useMimoApi: false }))}
              className={`
                p-4 rounded-lg cursor-pointer border-2 transition-all
                ${!config.useMimoApi
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <div className="flex items-center">
                <div className={`
                  w-4 h-4 rounded-full border-2 mr-3
                  ${!config.useMimoApi ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}
                `} />
                <div>
                  <h3 className="font-semibold text-gray-800">使用免费API</h3>
                  <p className="text-sm text-gray-600">无需配置，直接使用</p>
                </div>
              </div>
            </div>
            
            <div
              onClick={() => setConfig(prev => ({ ...prev, useMimoApi: true }))}
              className={`
                p-4 rounded-lg cursor-pointer border-2 transition-all
                ${config.useMimoApi
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <div className="flex items-center">
                <div className={`
                  w-4 h-4 rounded-full border-2 mr-3
                  ${config.useMimoApi ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}
                `} />
                <div>
                  <h3 className="font-semibold text-gray-800">使用MIMO API</h3>
                  <p className="text-sm text-gray-600">使用您自己的API密钥</p>
                </div>
              </div>
              
              {config.useMimoApi && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API密钥
                  </label>
                  <input
                    type="password"
                    value={config.mimoApiKey}
                    onChange={(e) => setConfig(prev => ({ ...prev, mimoApiKey: e.target.value }))}
                    placeholder="请输入您的MIMO API密钥"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={handleInterpret}
            disabled={isLoading || (config.useMimoApi && !config.mimoApiKey)}
            className={`
              w-full mt-6 py-3 px-6 rounded-lg font-semibold transition-all
              ${isLoading || (config.useMimoApi && !config.mimoApiKey)
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg'
              }
            `}
          >
            {isLoading ? '解读中...' : '开始AI解读'}
          </button>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <p className="text-red-600">{error}</p>
          </div>
        )}
        
        {result && (
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">解读结果</h2>
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap text-gray-600">{result.content}</pre>
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={handleSave}
                className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
              >
                保存解读
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
