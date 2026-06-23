// src/components/Coin.tsx
import { Coin as CoinType } from '../types/divination';

interface CoinProps {
  coin: CoinType;
}

export function Coin({ coin }: CoinProps) {
  return (
    <div
      className={`
        w-16 h-16 rounded-full border-4 border-yellow-600
        flex items-center justify-center
        transition-all duration-300
        ${coin.isShaking ? 'animate-spin' : ''}
        ${coin.side === 'heads' 
          ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg' 
          : 'bg-gradient-to-br from-gray-300 to-gray-500 shadow-md'
        }
      `}
    >
      <div className={`
        text-2xl font-bold
        ${coin.side === 'heads' ? 'text-yellow-900' : 'text-gray-700'}
      `}>
        {coin.side === 'heads' ? '字' : '花'}
      </div>
    </div>
  );
}
