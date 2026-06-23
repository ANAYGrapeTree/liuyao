// src/data/gua64.ts
import { GuaData } from '../types/paigua';

// 八卦数据
export const baGua: Record<string, { symbol: string; name: string }> = {
  '000': { symbol: '☷', name: '坤' },
  '001': { symbol: '☶', name: '艮' },
  '010': { symbol: '☵', name: '坎' },
  '011': { symbol: '☴', name: '巽' },
  '100': { symbol: '☳', name: '震' },
  '101': { symbol: '☲', name: '离' },
  '110': { symbol: '☱', name: '兑' },
  '111': { symbol: '☰', name: '乾' }
};

// 六十四卦数据（简化版，只包含几个常用卦）
export const gua64: Record<string, GuaData> = {
  '111111': {
    name: '乾为天',
    symbol: '☰☰',
    guaCi: '乾：元亨利贞。',
    yaoCi: [
      '初九：潜龙勿用。',
      '九二：见龙在田，利见大人。',
      '九三：君子终日乾乾，夕惕若厉，无咎。',
      '九四：或跃在渊，无咎。',
      '九五：飞龙在天，利见大人。',
      '上九：亢龙有悔。'
    ],
    upperGua: '乾',
    lowerGua: '乾'
  },
  '000000': {
    name: '坤为地',
    symbol: '☷☷',
    guaCi: '坤：元亨，利牝马之贞。',
    yaoCi: [
      '初六：履霜，坚冰至。',
      '六二：直，方，大，不习无不利。',
      '六三：含章可贞。或从王事，无成有终。',
      '六四：括囊，无咎无誉。',
      '六五：黄裳，元吉。',
      '上六：龙战于野，其血玄黄。'
    ],
    upperGua: '坤',
    lowerGua: '坤'
  },
  '111001': {
    name: '天泽履',
    symbol: '☰☱',
    guaCi: '履：履虎尾，不咥人，亨。',
    yaoCi: [
      '初九：素履，往无咎。',
      '九二：履道坦坦，幽人贞吉。',
      '六三：眇能视，跛能履，履虎尾，咥人凶。武人为于大君。',
      '九四：履虎尾，愬愬终吉。',
      '九五：夬履，贞厉。',
      '上九：视履考祥，其旋元吉。'
    ],
    upperGua: '乾',
    lowerGua: '兑'
  },
  '110111': {
    name: '天火同人',
    symbol: '☰☲',
    guaCi: '同人：同人于野，亨。利涉大川，利君子贞。',
    yaoCi: [
      '初九：同人于门，无咎。',
      '六二：同人于宗，吝。',
      '九三：伏戎于莽，升其高陵，三岁不兴。',
      '九四：乘其墉，弗克攻，吉。',
      '九五：同人先号咷而后笑，大师克相遇。',
      '上九：同人于郊，无悔。'
    ],
    upperGua: '乾',
    lowerGua: '离'
  },
  '111100': {
    name: '天雷无妄',
    symbol: '☰☳',
    guaCi: '无妄：元亨利贞。其匪正有眚，不利有攸往。',
    yaoCi: [
      '初九：无妄，往吉。',
      '六二：不耕获，不菑畲，则利有攸往。',
      '六三：无妄之灾，或系之牛，行人之得，邑人之灾。',
      '九四：可贞，无咎。',
      '九五：无妄之疾，勿药有喜。',
      '上九：无妄，行有眚，无攸利。'
    ],
    upperGua: '乾',
    lowerGua: '震'
  }
};

// 获取卦象数据
export const getGuaData = (yaoArray: { type: string }[]): GuaData | null => {
  // 将爻数组转换为二进制字符串
  const binary = yaoArray.map(yao => {
    if (yao.type === 'old_yang' || yao.type === 'young_yang') {
      return '1';
    }
    return '0';
  }).join('');
  
  return gua64[binary] || null;
};
