// src/components/Coin.tsx
interface CoinProps {
  isAnimating: boolean;
  result: 'head' | 'tail' | null;
}

export function Coin({ isAnimating, result }: CoinProps) {
  return (
    <div className="relative w-16 h-16 sm:w-20 sm:h-20">
      <div
        className={`
          w-full h-full rounded-full border-4 border-yellow-600
          flex items-center justify-center
          transition-all duration-300
          ${isAnimating ? 'animate-spin' : ''}
          ${result === 'head' ? 'bg-yellow-500' : 'bg-yellow-600'}
        `}
      >
        <span className="text-2xl sm:text-3xl font-bold text-yellow-900">
          {result === 'head' ? '字' : '花'}
        </span>
      </div>
    </div>
  );
}