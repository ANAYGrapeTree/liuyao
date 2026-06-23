# 排卦逻辑设计文档

## [S1] 概述

排卦逻辑是六爻算命网站的核心计算模块，根据用户摇出的六个爻，排列出完整的卦象，并计算相关的地支、六亲、六神、世应等信息。

## [S2] 六十四卦数据

### 卦象结构
- 每个卦由六个爻组成
- 上三爻为外卦（上卦），下三爻为内卦（下卦）
- 八个基本卦：乾、兑、离、震、巽、坎、艮、坤

### 卦象数据
- 六十四卦的名称、卦辞、爻辞
- 上下卦的组合关系

## [S3] 装卦规则

### 地支装卦
- 每个爻对应一个地支
- 地支顺序：子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥
- 根据卦象和爻位确定地支

### 六亲装卦
- 六亲：父母、兄弟、子孙、妻财、官鬼
- 根据卦宫和爻的五行属性确定六亲

### 六神装卦
- 六神：青龙、朱雀、勾陈、螣蛇、白虎、玄武
- 根据日辰和卦象确定六神

### 世应装卦
- 世爻：代表求测者自己
- 应爻：代表所求之事或对方
- 根据卦象确定世应位置

## [S4] 排卦流程

1. 接收六个爻的数据
2. 确定本卦和变卦
3. 计算上下卦
4. 查找卦名和卦辞
5. 装地支
6. 装六亲
7. 装六神
8. 装世应
9. 生成完整的排卦结果

## [S5] 界面显示

### 排卦结果显示区域
1. 卦名显示
2. 卦象图形（六个爻）
3. 地支显示
4. 六亲显示
5. 六神显示
6. 世应标记
7. 卦辞和爻辞

### 响应式设计
- 移动端：垂直排列
- 桌面端：水平排列

## [S6] 数据结构

```typescript
interface GuaData {
  name: string; // 卦名
  symbol: string; // 卦象符号
  guaCi: string; // 卦辞
  yaoCi: string[]; // 爻辞
  upperGua: string; // 上卦
  lowerGua: string; // 下卦
}

interface YaoDetail {
  yao: Yao; // 原始爻数据
  diZhi: string; // 地支
  liuQin: string; // 六亲
  liuShen: string; // 六神
  isShiYao: boolean; // 是否为世爻
  isYingYao: boolean; // 是否为应爻
}

interface PaiGuaResult {
  guaData: GuaData;
  yaoDetails: YaoDetail[];
  benGua: string; // 本卦
  bianGua: string; // 变卦
}
```

## [S7] 组件结构

```
PaiGua
├── GuaDisplay (卦象显示)
│   ├── GuaName (卦名)
│   ├── YaoLines (爻线显示)
│   └── GuaCi (卦辞)
├── YaoDetails (爻详情)
│   ├── DiZhi (地支)
│   ├── LiuQin (六亲)
│   └── LiuShen (六神)
└── ShiYingDisplay (世应显示)
```

## [S8] 样式设计

使用Tailwind CSS实现：
- 卦象爻线样式：粗线条，黑色
- 地支、六亲、六神文字样式
- 世应标记样式
- 响应式布局
