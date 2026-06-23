// src/components/Divination.tsx
import { useState } from 'react';
import { Yao, YaoType } from '../types/divination';
import { Coin } from './Coin';
import { YaoLine } from './YaoLine';

interface DivinationProps {
  onDivinationComplete: (yaoArray: Yao[]) => void;
  onBack: () => void;
}

export function Divination({ onDivinationComplete, onBack }: DivinationProps) {
  const [yaoArray, setYaoArray] = useState<Yao[]>([]);
  const [currentYao, setCurrentYao] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [coinResults, setCoinResults] = useState<('head' | 'tail')[]>([]);
  const [showResult, setShowResult] = useState(false);

  const getYaoSymbol = (type: YaoType): string => {
    switch (type) {
      case 'old_yang':
        return '○';
      case 'young_yang':
        return '—';
      case 'young_yin':
        return '--';
      case 'old_yin':
        return '×';
      default:
        return '—';
    }
  };

  const tossCoins = () => {
    if (isAnimating || currentYao >= 6) return;
    
    setIsAnimating(true);
    setCoinResults([]);
    
    const results: ('head' | 'tail')[] = [];
    for (let i = 0; i < 3; i++) {
      results.push(Math.random() > 0.5 ? 'head' : 'tail');
    }
    
    setTimeout(() => {
      setCoinResults(results);
      setIsAnimating(false);
      
      const headCount = results.filter(r => r === 'head').length;
      let yaoType: YaoType;
      
      if (headCount === 3) {
        yaoType = 'old_yang';
      } else if (headCount === 0) {
        yaoType = 'old_yin';
      } else if (headCount === 2) {
        yaoType = 'young_yang';
      } else {
        yaoType = 'young_yin';
      }
      
      const newYao: Yao = {
        type: yaoType,
        position: currentYao + 1,
        symbol: getYaoSymbol(yaoType),
        changing: yaoType === 'old_yang' || yaoType === 'old_yin'
      };
      
      setYaoArray(prev => [...prev, newYao]);
      setCurrentYao(prev => prev + 1);
      
      if (currentYao === 5) {
        setTimeout(() => {
          setShowResult(true);
        }, 500);
      }
    }, 1500);
  };

  const handleComplete = () => {
    onDivinationComplete(yaoArray);
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
              起卦
            </h1>
          </div>
          
          <div className="card mb-8 animate-slide-up">
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-neutral-800 mb-2 font-serif">
                铜钱摇卦法
              </h2>
              <p className="text-neutral-600">
                请点击下方按钮开始摇卦，共需摇六次
              </p>
            </div>
            
            <div className="flex justify-center space-x-4 mb-8">
              {coinResults.map((result, index) => (
                <Coin
                  key={index}
                  isAnimating={isAnimating}
                  result={result}
                />
              ))}
              
              {coinResults.length === 0 && (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-dashed border-neutral-300 flex items-center justify-center">
                  <span className="text-neutral-400">?</span>
                </div>
              )}
            </div>
            
            <div className="text-center">
              <button
                onClick={tossCoins}
                disabled={isAnimating || currentYao >= 6}
                className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnimating ? '摇卦中...' : currentYao >= 6 ? '摇卦完成' : '开始摇卦'}
              </button>
            </div>
          </div>
          
          <div className="card animate-slide-up">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4 font-serif">
              卦象显示
            </h3>
            
            <div className="space-y-2">
              {yaoArray.map((yao, index) => (
                <YaoLine key={index} yao={yao} index={index} />
              ))}
              
              {Array.from({ length: 6 - yaoArray.length }).map((_, index) => (
                <div key={`empty-${index}`} className="flex items-center justify-center py-2">
                  <div className="w-16 sm:w-20 h-3 bg-neutral-200 rounded-full" />
                </div>
              ))}
            </div>
          </div>
          
          {showResult && (
            <div className="mt-8 text-center animate-scale-in">
              <button
                onClick={handleComplete}
                className="btn btn-secondary"
              >
                继续排卦
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}