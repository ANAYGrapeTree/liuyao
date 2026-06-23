// src/components/PaiGua.tsx
import type { Yao } from '../types/divination';
import type { PaiGuaResult } from '../types/paigua';
import { YaoLine } from './YaoLine';
import { paigua } from '../utils/paigua';

interface PaiGuaProps {
  yaoArray: Yao[];
  onBack: () => void;
  onComplete: (result: PaiGuaResult) => void;
}

export function PaiGua({ yaoArray, onBack, onComplete }: PaiGuaProps) {
  const handleComplete = () => {
    const result = paigua(yaoArray);
    if (result) {
      onComplete(result);
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
              排卦
            </h1>
          </div>
          
          <div className="card mb-8 animate-slide-up">
            <h2 className="text-xl font-semibold text-neutral-800 mb-6 font-serif">
              卦象信息
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-medium text-neutral-700 mb-2">卦名</h3>
                <p className="text-2xl font-bold text-primary-600">示例卦</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-neutral-700 mb-2">卦象</h3>
                <p className="text-4xl">☰</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium text-neutral-700 mb-3">爻象</h3>
              <div className="space-y-2">
                {yaoArray.map((yao, index) => (
                  <YaoLine key={index} yao={yao} index={index} />
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-neutral-700 mb-2">地支</h3>
                <div className="flex flex-wrap gap-2">
                  {['子', '丑', '寅', '卯', '辰', '巳'].map((dizhi, index) => (
                    <span key={index} className="px-3 py-1 bg-neutral-100 rounded-full text-sm">
                      {dizhi}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-neutral-700 mb-2">六亲</h3>
                <div className="flex flex-wrap gap-2">
                  {['父母', '兄弟', '子孙', '妻财', '官鬼', '兄弟'].map((liuqin, index) => (
                    <span key={index} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                      {liuqin}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-neutral-700 mb-2">六神</h3>
                <div className="flex flex-wrap gap-2">
                  {['青龙', '朱雀', '勾陈', '螣蛇', '白虎', '玄武'].map((liushen, index) => (
                    <span key={index} className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm">
                      {liushen}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-neutral-700 mb-2">世应</h3>
                <div className="flex space-x-4">
                  <div className="text-center">
                    <p className="text-sm text-neutral-600">世</p>
                    <p className="text-xl font-bold text-accent-600">1</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-neutral-600">应</p>
                    <p className="text-xl font-bold text-accent-600">4</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center animate-slide-up">
            <button
              onClick={handleComplete}
              className="btn btn-secondary"
            >
              继续解卦
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
