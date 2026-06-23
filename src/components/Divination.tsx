// src/components/Divination.tsx
import { useState } from 'react';
import { Coin as CoinType, Yao, DivinationState } from '../types/divination';
import { tossCoin, calculateYao, createYao, initializeCoins } from '../utils/divination';
import { Coin } from './Coin';
import { YaoLine } from './YaoLine';

interface DivinationProps {
  onDivinationComplete: (yaoArray: Yao[]) => void;
  onBack: () => void;
}

export function Divination({ onDivinationComplete, onBack }: DivinationProps) {
  const [state, setState] = useState<DivinationState>({
    coins: initializeCoins(),
    yaoArray: [],
    currentYao: 1,
    isShaking: false,
    isComplete: false
  });

  const handleShake = () => {
    if (state.isShaking || state.isComplete || state.currentYao > 6) return;
    
    setState(prev => ({
      ...prev,
      isShaking: true,
      coins: prev.coins.map(coin => ({ ...coin, isShaking: true }))
    }));

    // 模拟抛掷动画
    setTimeout(() => {
      const newCoins = state.coins.map(coin => ({
        ...coin,
        side: tossCoin(),
        isShaking: false
      }));
      
      const yaoType = calculateYao(newCoins);
      const newYao = createYao(yaoType, state.currentYao);
      
      setState(prev => ({
        ...prev,
        coins: newCoins,
        yaoArray: [...prev.yaoArray, newYao],
        currentYao: prev.currentYao + 1,
        isShaking: false,
        isComplete: prev.currentYao === 6
      }));
    }, 1000);
  };

  const handleReset = () => {
    setState({
      coins: initializeCoins(),
      yaoArray: [],
      currentYao: 1,
      isShaking: false,
      isComplete: false
    });
  };

  const handleConfirm = () => {
    if (state.isComplete) {
      onDivinationComplete(state.yaoArray);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="mb-4 text-gray-600 hover:text-gray-800"
          >
            ← 返回选择问题
          </button>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">起卦</h1>
          <p className="text-lg text-gray-600">
            第 {state.currentYao} 爻 / 共 6 爻
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                铜钱抛掷
              </h2>
              
              <div className="flex justify-center space-x-4 mb-8">
                {state.coins.map(coin => (
                  <Coin key={coin.id} coin={coin} />
                ))}
              </div>
              
              <button
                onClick={handleShake}
                disabled={state.isShaking || state.isComplete || state.currentYao > 6}
                className={`
                  w-full py-3 px-6 rounded-lg font-semibold transition-all
                  ${state.isShaking || state.isComplete || state.currentYao > 6
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-500 text-white hover:bg-green-600 shadow-md hover:shadow-lg'
                  }
                `}
              >
                {state.isShaking ? '抛掷中...' : '抛掷铜钱'}
              </button>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                卦象
              </h2>
              
              <div className="space-y-2">
                {state.yaoArray.map(yao => (
                  <YaoLine key={yao.position} yao={yao} />
                ))}
                
                {/* 显示空爻 */}
                {Array.from({ length: 6 - state.yaoArray.length }).map((_, index) => (
                  <div key={`empty-${index}`} className="flex items-center justify-center mb-2">
                    <div className="w-24 h-2 border-2 border-dashed border-gray-300 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={handleReset}
            className="py-3 px-6 rounded-lg font-semibold bg-gray-500 text-white hover:bg-gray-600 transition-all"
          >
            重新开始
          </button>
          
          <button
            onClick={handleConfirm}
            disabled={!state.isComplete}
            className={`
              py-3 px-6 rounded-lg font-semibold transition-all
              ${state.isComplete
                ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            确认卦象
          </button>
        </div>
      </div>
    </div>
  );
}
