// src/utils/paigua.ts
import { Yao, YaoType } from '../types/divination';
import { GuaData, YaoDetail, PaiGuaResult } from '../types/paigua';
import { getGuaData } from '../data/gua64';

// 地支数据
const diZhiList = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 六亲数据
const liuQinList = ['父母', '兄弟', '子孙', '妻财', '官鬼'];

// 六神数据
const liuShenList = ['青龙', '朱雀', '勾陈', '螣蛇', '白虎', '玄武'];

// 获取地支
export const getDiZhi = (yao: Yao): string => {
  // 简化版：根据爻位置和类型返回地支
  const index = (yao.position - 1 + yao.type.charCodeAt(0)) % 12;
  return diZhiList[index];
};

// 获取六亲
export const getLiuQin = (yao: Yao): string => {
  // 简化版：根据爻类型返回六亲
  const index = (yao.position - 1) % 5;
  return liuQinList[index];
};

// 获取六神
export const getLiuShen = (yao: Yao): string => {
  // 简化版：根据爻位置返回六神
  const index = (yao.position - 1) % 6;
  return liuShenList[index];
};

// 判断是否为世爻
export const isShiYao = (yao: Yao): boolean => {
  // 简化版：第三爻为世爻
  return yao.position === 3;
};

// 判断是否为应爻
export const isYingYao = (yao: Yao): boolean => {
  // 简化版：第六爻为应爻
  return yao.position === 6;
};

// 排卦主函数
export const paigua = (yaoArray: Yao[]): PaiGuaResult | null => {
  const guaData = getGuaData(yaoArray);
  if (!guaData) return null;
  
  const yaoDetails: YaoDetail[] = yaoArray.map(yao => ({
    yao,
    diZhi: getDiZhi(yao),
    liuQin: getLiuQin(yao),
    liuShen: getLiuShen(yao),
    isShiYao: isShiYao(yao),
    isYingYao: isYingYao(yao)
  }));
  
  return {
    guaData,
    yaoDetails,
    benGua: guaData.name,
    bianGua: guaData.name // 简化版：变卦与本卦相同
  };
};
