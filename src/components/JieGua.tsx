// src/components/JieGua.tsx
import { PaiGuaResult } from '../types/paigua';

interface JieGuaProps {
  paiguaResult: PaiGuaResult;
  questionType: string;
  onBack: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function JieGua({ paiguaResult, questionType, onBack }: JieGuaProps) {
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
            <h2 className="text-xl font-semibold text-neutral-800 mb-6 font-serif">
              卦象解读
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-neutral-700 mb-2">用神分析</h3>
                <p className="text-neutral-600">
                  根据问题类型 "{questionType}"，用神为相应的六亲。
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-neutral-700 mb-2">旺衰判断</h3>
                <p className="text-neutral-600">
                  分析用神在月建、日辰中的旺衰情况。
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-neutral-700 mb-2">吉凶评分</h3>
                <div className="flex items-center space-x-4">
                  <div className="w-32 h-4 bg-neutral-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-secondary-500 transition-all duration-500"
                      style={{ width: '70%' }}
                    />
                  </div>
                  <span className="text-lg font-bold text-secondary-600">70分</span>
                </div>
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