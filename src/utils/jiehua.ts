// src/utils/jiehua.ts
import { PaiGuaResult } from '../types/paigua';
import { JieGuaAnalysis, JieGuaResult } from '../types/jiehua';

// 根据问题类型确定用神
const getYongShen = (questionType: string): string => {
  switch (questionType) {
    case 'love':
      return '妻财';
    case 'career':
      return '官鬼';
    case 'wealth':
      return '妻财';
    case 'health':
      return '子孙';
    case 'study':
      return '父母';
    default:
      return '妻财';
  }
};

// 分析用神旺衰
const analyzeYongShen = (paiguaResult: PaiGuaResult, questionType: string): string => {
  const yongShen = getYongShen(questionType);
  const yongShenYao = paiguaResult.yaoDetails.find(
    detail => detail.liuQin === yongShen
  );
  
  if (!yongShenYao) {
    return `未找到${yongShen}爻，无法进行用神分析。`;
  }
  
  // 简化版：根据爻类型判断旺衰
  let wangShuai = '';
  if (yongShenYao.yao.type === 'old_yang' || yongShenYao.yao.type === 'young_yang') {
    wangShuai = '旺';
  } else {
    wangShuai = '衰';
  }
  
  return `${yongShen}爻为${yongShenYao.yao.symbol}，处于${wangShuai}相。`;
};

// 分析旺衰
const analyzeWangShuai = (paiguaResult: PaiGuaResult): string => {
  // 简化版：分析动爻的影响
  const dongYao = paiguaResult.yaoDetails.filter(
    detail => detail.yao.type === 'old_yang' || detail.yao.type === 'old_yin'
  );
  
  if (dongYao.length === 0) {
    return '本卦无动爻，卦象稳定。';
  }
  
  return `本卦有${dongYao.length}个动爻，卦象有变化趋势。`;
};

// 生成解卦结果
export const jiehua = (
  paiguaResult: PaiGuaResult,
  questionType: string
): JieGuaResult => {
  // 整体分析
  const overallAnalysis = `本卦为${paiguaResult.guaData.name}，${paiguaResult.guaData.guaCi}`;
  
  // 用神分析
  const yongShenAnalysis = analyzeYongShen(paiguaResult, questionType);
  
  // 旺衰判断
  const wangShuaiAnalysis = analyzeWangShuai(paiguaResult);
  
  // 具体建议
  const suggestions = [
    '保持积极心态',
    '注意时机把握',
    '谨慎行事'
  ];
  
  // 注意事项
  const warnings = [
    '避免冲动决策',
    '注意人际关系',
    '保持耐心'
  ];
  
  // 计算吉凶评分（简化版）
  let score = 50;
  const yongShen = getYongShen(questionType);
  const yongShenYao = paiguaResult.yaoDetails.find(
    detail => detail.liuQin === yongShen
  );
  
  if (yongShenYao) {
    if (yongShenYao.yao.type === 'old_yang' || yongShenYao.yao.type === 'young_yang') {
      score += 20;
    } else {
      score -= 10;
    }
  }
  
  // 判断趋势
  let trend: '吉' | '凶' | '平' = '平';
  if (score >= 70) {
    trend = '吉';
  } else if (score <= 30) {
    trend = '凶';
  }
  
  return {
    analysis: {
      overallAnalysis,
      yongShenAnalysis,
      wangShuaiAnalysis,
      suggestions,
      warnings
    },
    score,
    trend
  };
};
