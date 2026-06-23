// src/utils/divination.ts
import { Coin, CoinSide, Yao, YaoType } from '../types/divination';

// 随机生成铜钱正反面
export const tossCoin = (): CoinSide => {
  return Math.random() < 0.5 ? 'heads' : 'tails';
};

// 根据三枚铜钱结果计算爻类型
export const calculateYao = (coins: Coin[]): YaoType => {
  const headsCount = coins.filter(coin => coin.side === 'heads').length;
  
  switch (headsCount) {
    case 3: // 三个正面：老阳（变爻）
      return 'old_yang';
    case 2: // 两个正面：少阳
      return 'young_yang';
    case 1: // 一个正面：少阴
      return 'young_yin';
    case 0: // 零个正面：老阴（变爻）
      return 'old_yin';
    default:
      return 'young_yang';
  }
};

// 根据爻类型获取符号
export const getYaoSymbol = (type: YaoType): string => {
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

// 创建新的爻
export const createYao = (type: YaoType, position: number): Yao => {
  return {
    type,
    position,
    symbol: getYaoSymbol(type)
  };
};

// 初始化铜钱数组
export const initializeCoins = (): Coin[] => {
  return [
    { id: 1, side: 'heads', isShaking: false },
    { id: 2, side: 'heads', isShaking: false },
    { id: 3, side: 'heads', isShaking: false }
  ];
};
