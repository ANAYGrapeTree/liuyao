// src/types/paigua.ts
import { Yao } from './divination';

export interface GuaData {
  name: string;
  symbol: string;
  guaCi: string;
  yaoCi: string[];
  upperGua: string;
  lowerGua: string;
}

export interface YaoDetail {
  yao: Yao;
  diZhi: string;
  liuQin: string;
  liuShen: string;
  isShiYao: boolean;
  isYingYao: boolean;
}

export interface PaiGuaResult {
  guaData: GuaData;
  yaoDetails: YaoDetail[];
  benGua: string;
  bianGua: string;
}
