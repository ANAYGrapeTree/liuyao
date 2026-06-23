// src/components/PaiGua.tsx
import { Yao } from '../types/divination';
import { PaiGuaResult, YaoDetail } from '../types/paigua';
import { paigua } from '../utils/paigua';

interface PaiGuaProps {
  yaoArray: Yao[];
  onBack: () => void;
  onComplete: (result: PaiGuaResult) => void;
}

export function PaiGua({ yaoArray, onBack, onComplete }: PaiGuaProps) {
  const result = paigua(yaoArray);
  
  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">排卦错误</h2>
          <p className="text-gray-600 mb-4">无法解析卦象数据</p>
          <button
            onClick={onBack}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            返回
          </button>
        </div>
      </div>
    );
  }
  
  const handleConfirm = () => {
    onComplete(result);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="mb-4 text-gray-600 hover:text-gray-800"
          >
            ← 返回起卦
          </button>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">排卦结果</h1>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            {result.guaData.name}
          </h2>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">卦象</h3>
              <div className="space-y-2">
                {result.yaoDetails.map((detail: YaoDetail) => (
                  <div key={detail.yao.position} className="flex items-center">
                    <div className="w-8 text-gray-500">{detail.yao.position}</div>
                    <div className="flex-1">
                      {detail.yao.type === 'old_yang' || detail.yao.type === 'young_yang' ? (
                        <div className="w-24 h-2 bg-gray-800 rounded" />
                      ) : (
                        <div className="flex space-x-2">
                          <div className="w-10 h-2 bg-gray-800 rounded" />
                          <div className="w-10 h-2 bg-gray-800 rounded" />
                        </div>
                      )}
                    </div>
                    <div className="w-16 text-center font-mono">
                      {detail.yao.symbol}
                    </div>
                    <div className="w-16 text-center">{detail.diZhi}</div>
                    <div className="w-16 text-center">{detail.liuQin}</div>
                    <div className="w-16 text-center">{detail.liuShen}</div>
                    {detail.isShiYao && (
                      <div className="w-8 text-center text-red-500 font-bold">世</div>
                    )}
                    {detail.isYingYao && (
                      <div className="w-8 text-center text-blue-500 font-bold">应</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">卦辞</h3>
              <p className="text-gray-600 mb-4">{result.guaData.guaCi}</p>
              
              <h3 className="text-lg font-semibold text-gray-700 mb-4">爻辞</h3>
              <ul className="space-y-2">
                {result.guaData.yaoCi.map((ci: string, index: number) => (
                  <li key={index} className="text-gray-600 text-sm">{ci}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={handleConfirm}
            className="py-3 px-6 rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg transition-all"
          >
            确认排卦结果
          </button>
        </div>
      </div>
    </div>
  );
}
