// src/components/YaoLine.tsx
import { Yao } from '../types/divination';

interface YaoLineProps {
  yao: Yao;
}

export function YaoLine({ yao }: YaoLineProps) {
  const isYang = yao.type === 'old_yang' || yao.type === 'young_yang';
  const isChanging = yao.type === 'old_yang' || yao.type === 'old_yin';
  
  return (
    <div className="flex items-center justify-center mb-2">
      <div className={`
        flex items-center justify-center
        ${isYang ? 'w-24 h-2' : 'flex space-x-2'}
      `}>
        {isYang ? (
          <div className={`
            w-full h-full rounded
            ${isChanging ? 'bg-red-500' : 'bg-gray-800'}
          `} />
        ) : (
          <>
            <div className={`
              w-10 h-2 rounded
              ${isChanging ? 'bg-red-500' : 'bg-gray-800'}
            `} />
            <div className={`
              w-10 h-2 rounded
              ${isChanging ? 'bg-red-500' : 'bg-gray-800'}
            `} />
          </>
        )}
      </div>
      <div className={`
        ml-4 text-lg font-mono
        ${isChanging ? 'text-red-500' : 'text-gray-600'}
      `}>
        {yao.symbol}
      </div>
    </div>
  );
}
