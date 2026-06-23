// src/components/YaoLine.tsx
import { Yao } from '../types/divination';

interface YaoLineProps {
  yao: Yao;
  index: number;
}

export function YaoLine({ yao, index }: YaoLineProps) {
  const isYang = yao.type === 'yang' || yao.type === 'old_yang' || yao.type === 'young_yang';
  const isChanging = yao.type === 'old_yang' || yao.type === 'old_yin';
  
  return (
    <div className="flex items-center justify-center space-x-4 py-2">
      <div className="w-8 text-right text-sm font-medium text-neutral-600">
        {index + 1}
      </div>
      
      <div className="flex space-x-1">
        {isYang ? (
          <div className="w-16 sm:w-20 h-3 bg-neutral-800 rounded-full" />
        ) : (
          <>
            <div className="w-7 sm:w-9 h-3 bg-neutral-800 rounded-full" />
            <div className="w-7 sm:w-9 h-3 bg-neutral-800 rounded-full" />
          </>
        )}
      </div>
      
      {isChanging && (
        <div className="text-accent-500 font-bold animate-pulse">
          O
        </div>
      )}
    </div>
  );
}