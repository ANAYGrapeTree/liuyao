// src/types/divination.ts
export type CoinSide = 'heads' | 'tails';
export type YaoType = 'old_yang' | 'young_yang' | 'young_yin' | 'old_yin';

export interface Coin {
  id: number;
  side: CoinSide;
  isShaking: boolean;
}

export interface Yao {
  type: YaoType;
  position: number; // 1-6, 从下往上
  symbol: string; // ○, —, --, ×
  changing?: boolean; // 是否为变爻
}

export interface DivinationState {
  coins: Coin[];
  yaoArray: Yao[];
  currentYao: number;
  isShaking: boolean;
  isComplete: boolean;
}
