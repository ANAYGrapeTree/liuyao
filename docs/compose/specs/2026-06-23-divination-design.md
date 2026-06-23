# 起卦界面设计文档

## [S1] 概述

起卦界面是六爻算命网站的核心交互界面，用户通过模拟铜钱摇卦法来生成卦象。每次摇卦会产生一个爻，共摇六次形成一个完整的卦。

## [S2] 铜钱摇卦法规则

### 铜钱属性
- 铜钱有正反两面，正面为"字"，反面为"花"
- 每次抛掷三枚铜钱

### 爻的判定规则
- 三个正面（字字字）：老阳（变爻），标记为○
- 两个正面一个反面（字字花）：少阳，标记为—
- 一个正面两个反面（字花花）：少阴，标记为--
- 三个反面（花花花）：老阴（变爻），标记为×

### 摇卦顺序
- 从下往上摇，第一爻为初爻（最下面）
- 共摇六次，形成六个爻

## [S3] 界面布局

### 主要区域
1. **标题区域**：显示"起卦"标题和当前摇卦进度
2. **铜钱抛掷区域**：显示三枚铜钱和抛掷动画
3. **卦象显示区域**：显示已摇出的爻
4. **操作按钮**：抛掷铜钱、重新开始、确认卦象

### 响应式设计
- 移动端：垂直布局，铜钱和卦象上下排列
- 桌面端：水平布局，铜钱和卦象左右排列

## [S4] 交互流程

1. 用户点击"抛掷铜钱"按钮
2. 铜钱进行抛掷动画（旋转、落地）
3. 显示三枚铜钱的结果（正面/反面）
4. 根据规则计算爻的类型
5. 将爻添加到卦象中（从下往上）
6. 更新进度显示（第N爻/共6爻）
7. 重复直到六爻完成
8. 显示完整卦象，用户可确认或重新开始

## [S5] 动画效果

### 铜钱抛掷动画
- 铜钱旋转动画（3D旋转效果）
- 铜钱落地动画（弹性效果）
- 铜钱结果展示（正面/反面）

### 爻添加动画
- 新爻从下方滑入
- 老阳/老阴爻有特殊高亮效果

## [S6] 状态管理

使用React useState管理以下状态：
- `coins`: 三枚铜钱的状态（正面/反面）
- `yaoArray`: 已摇出的六个爻
- `currentYao`: 当前摇到第几爻
- `isShaking`: 是否正在抛掷动画中
- `isComplete`: 是否摇卦完成

## [S7] 组件结构

```
Divination
├── Header (标题和进度)
├── CoinArea (铜钱抛掷区域)
│   ├── Coin (单个铜钱组件)
│   └── ShakeButton (抛掷按钮)
├── YaoDisplay (卦象显示区域)
│   └── YaoLine (单个爻组件)
└── ControlButtons (操作按钮)
    ├── ResetButton (重新开始)
    └── ConfirmButton (确认卦象)
```

## [S8] 数据结构

```typescript
type CoinSide = 'heads' | 'tails';
type YaoType = 'old_yang' | 'young_yang' | 'young_yin' | 'old_yin';

interface Coin {
  id: number;
  side: CoinSide;
  isShaking: boolean;
}

interface Yao {
  type: YaoType;
  position: number; // 1-6, 从下往上
  symbol: string; // ○, —, --, ×
}

interface DivinationState {
  coins: Coin[];
  yaoArray: Yao[];
  currentYao: number;
  isShaking: boolean;
  isComplete: boolean;
}
```

## [S9] 样式设计

使用Tailwind CSS实现：
- 铜钱样式：圆形，金色/银色
- 卦象爻样式：粗线条，黑色
- 动画效果：CSS动画和过渡
- 响应式布局
