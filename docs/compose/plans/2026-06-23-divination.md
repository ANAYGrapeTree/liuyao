# 起卦界面实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use compose:subagent (recommended) or compose:execute to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现六爻算命网站的起卦界面，用户通过模拟铜钱摇卦法生成卦象

**Architecture:** 使用React组件化架构，创建Divination组件及其子组件，使用CSS动画实现铜钱抛掷效果

**Tech Stack:** React, TypeScript, Tailwind CSS, CSS动画

---

## 文件结构

在开始定义任务之前，先规划要创建或修改的文件及其职责：

- `src/types/divination.ts` - 起卦相关的类型定义
- `src/utils/divination.ts` - 起卦逻辑工具函数
- `src/components/Coin.tsx` - 铜钱组件
- `src/components/YaoLine.tsx` - 爻组件
- `src/components/Divination.tsx` - 主起卦组件
- `src/App.tsx` - 修改主应用组件，集成起卦界面

## 任务分解

### Task 1: 创建类型定义文件

**Covers:** [S6, S8]

**Files:**
- Create: `src/types/divination.ts`

- [ ] **Step 1: 创建类型定义文件**

```typescript
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
}

export interface DivinationState {
  coins: Coin[];
  yaoArray: Yao[];
  currentYao: number;
  isShaking: boolean;
  isComplete: boolean;
}
```

- [ ] **Step 2: 验证文件创建**

Run: `ls -la src/types/`
Expected: 看到 divination.ts 文件

- [ ] **Step 3: 提交**

```bash
git add src/types/divination.ts
git commit -m "feat: add divination type definitions"
```

### Task 2: 创建起卦逻辑工具函数

**Covers:** [S2]

**Files:**
- Create: `src/utils/divination.ts`

- [ ] **Step 1: 创建起卦逻辑工具函数**

```typescript
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
```

- [ ] **Step 2: 验证文件创建**

Run: `ls -la src/utils/`
Expected: 看到 divination.ts 文件

- [ ] **Step 3: 提交**

```bash
git add src/utils/divination.ts
git commit -m "feat: add divination utility functions"
```

### Task 3: 创建铜钱组件

**Covers:** [S3, S5, S9]

**Files:**
- Create: `src/components/Coin.tsx`

- [ ] **Step 1: 创建Coin组件**

```typescript
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
```

- [ ] **Step 2: 验证组件创建**

Run: `ls -la src/components/`
Expected: 看到 Coin.tsx 文件

- [ ] **Step 3: 提交**

```bash
git add src/components/Coin.tsx
git commit -m "feat: add Coin component"
```

### Task 4: 创建爻组件

**Covers:** [S3, S7, S8]

**Files:**
- Create: `src/components/YaoLine.tsx`

- [ ] **Step 1: 创建YaoLine组件**

```typescript
// src/components/YaoLine.tsx
import { Yao } from '../types/divination';

interface YaoLineProps {
  yao: Yao;
}

export function YaoLine({ yao }: YaoLineProps) {
  const isYang = yao.type === 'old_yang' || yao.type === 'young_yang';
  const isChanging = yao.type === 'old_yang' || yao.type === 'old_yin';
  
  return (
    <div className="flex items-center justify-center mb-2">
      <div className={`
        flex items-center justify-center
        ${isYang ? 'w-24 h-2' : 'flex space-x-2'}
      `}>
        {isYang ? (
          <div className={`
            w-full h-full rounded
            ${isChanging ? 'bg-red-500' : 'bg-gray-800'}
          `} />
        ) : (
          <>
            <div className={`
              w-10 h-2 rounded
              ${isChanging ? 'bg-red-500' : 'bg-gray-800'}
            `} />
            <div className={`
              w-10 h-2 rounded
              ${isChanging ? 'bg-red-500' : 'bg-gray-800'}
            `} />
          </>
        )}
      </div>
      <div className={`
        ml-4 text-lg font-mono
        ${isChanging ? 'text-red-500' : 'text-gray-600'}
      `}>
        {yao.symbol}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 验证组件创建**

Run: `ls -la src/components/`
Expected: 看到 YaoLine.tsx 文件

- [ ] **Step 3: 提交**

```bash
git add src/components/YaoLine.tsx
git commit -m "feat: add YaoLine component"
```

### Task 5: 创建主起卦组件

**Covers:** [S2, S3, S4, S5, S6, S7]

**Files:**
- Create: `src/components/Divination.tsx`

- [ ] **Step 1: 创建Divination组件**

```typescript
// src/components/Divination.tsx
import { useState } from 'react';
import { Coin as CoinType, Yao, DivinationState } from '../types/divination';
import { tossCoin, calculateYao, createYao, initializeCoins } from '../utils/divination';
import { Coin } from './Coin';
import { YaoLine } from './YaoLine';

interface DivinationProps {
  onDivinationComplete: (yaoArray: Yao[]) => void;
  onBack: () => void;
}

export function Divination({ onDivinationComplete, onBack }: DivinationProps) {
  const [state, setState] = useState<DivinationState>({
    coins: initializeCoins(),
    yaoArray: [],
    currentYao: 1,
    isShaking: false,
    isComplete: false
  });

  const handleShake = () => {
    if (state.isShaking || state.isComplete || state.currentYao > 6) return;
    
    setState(prev => ({
      ...prev,
      isShaking: true,
      coins: prev.coins.map(coin => ({ ...coin, isShaking: true }))
    }));

    // 模拟抛掷动画
    setTimeout(() => {
      const newCoins = state.coins.map(coin => ({
        ...coin,
        side: tossCoin(),
        isShaking: false
      }));
      
      const yaoType = calculateYao(newCoins);
      const newYao = createYao(yaoType, state.currentYao);
      
      setState(prev => ({
        ...prev,
        coins: newCoins,
        yaoArray: [...prev.yaoArray, newYao],
        currentYao: prev.currentYao + 1,
        isShaking: false,
        isComplete: prev.currentYao === 6
      }));
    }, 1000);
  };

  const handleReset = () => {
    setState({
      coins: initializeCoins(),
      yaoArray: [],
      currentYao: 1,
      isShaking: false,
      isComplete: false
    });
  };

  const handleConfirm = () => {
    if (state.isComplete) {
      onDivinationComplete(state.yaoArray);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="mb-4 text-gray-600 hover:text-gray-800"
          >
            ← 返回选择问题
          </button>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">起卦</h1>
          <p className="text-lg text-gray-600">
            第 {state.currentYao} 爻 / 共 6 爻
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                铜钱抛掷
              </h2>
              
              <div className="flex justify-center space-x-4 mb-8">
                {state.coins.map(coin => (
                  <Coin key={coin.id} coin={coin} />
                ))}
              </div>
              
              <button
                onClick={handleShake}
                disabled={state.isShaking || state.isComplete || state.currentYao > 6}
                className={`
                  w-full py-3 px-6 rounded-lg font-semibold transition-all
                  ${state.isShaking || state.isComplete || state.currentYao > 6
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-500 text-white hover:bg-green-600 shadow-md hover:shadow-lg'
                  }
                `}
              >
                {state.isShaking ? '抛掷中...' : '抛掷铜钱'}
              </button>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                卦象
              </h2>
              
              <div className="space-y-2">
                {state.yaoArray.map(yao => (
                  <YaoLine key={yao.position} yao={yao} />
                ))}
                
                {/* 显示空爻 */}
                {Array.from({ length: 6 - state.yaoArray.length }).map((_, index) => (
                  <div key={`empty-${index}`} className="flex items-center justify-center mb-2">
                    <div className="w-24 h-2 border-2 border-dashed border-gray-300 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={handleReset}
            className="py-3 px-6 rounded-lg font-semibold bg-gray-500 text-white hover:bg-gray-600 transition-all"
          >
            重新开始
          </button>
          
          <button
            onClick={handleConfirm}
            disabled={!state.isComplete}
            className={`
              py-3 px-6 rounded-lg font-semibold transition-all
              ${state.isComplete
                ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            确认卦象
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 验证组件创建**

Run: `ls -la src/components/`
Expected: 看到 Divination.tsx 文件

- [ ] **Step 3: 提交**

```bash
git add src/components/Divination.tsx
git commit -m "feat: add Divination component"
```

### Task 6: 修改主应用组件

**Covers:** [S2, S4]

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: 修改App.tsx集成起卦组件**

```typescript
// src/App.tsx
import { useState } from 'react';
import { QuestionSelector } from './components/QuestionSelector';
import { Divination } from './components/Divination';
import { QuestionCategory, QuestionSelectorState } from './types/question';
import { Yao } from './types/divination';

function App() {
  const [currentStep, setCurrentStep] = useState<'question' | 'divination' | 'result'>('question');
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory | null>(null);
  const [divinationResult, setDivinationResult] = useState<Yao[]>([]);

  const handleQuestionConfirm = (question: string, category: QuestionCategory) => {
    setSelectedQuestion(question);
    setSelectedCategory(category);
    setCurrentStep('divination');
  };

  const handleDivinationComplete = (yaoArray: Yao[]) => {
    setDivinationResult(yaoArray);
    setCurrentStep('result');
    console.log('起卦完成:', yaoArray);
  };

  const handleBackToQuestion = () => {
    setCurrentStep('question');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {currentStep === 'question' && (
        <QuestionSelector onQuestionConfirm={handleQuestionConfirm} />
      )}
      
      {currentStep === 'divination' && (
        <Divination
          onDivinationComplete={handleDivinationComplete}
          onBack={handleBackToQuestion}
        />
      )}
      
      {currentStep === 'result' && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">解卦结果</h2>
            <p className="text-gray-600 mb-4">问题：{selectedQuestion}</p>
            <p className="text-gray-600 mb-4">类别：{selectedCategory?.name}</p>
            <p className="text-gray-600 mb-4">卦象：</p>
            <div className="mb-4">
              {divinationResult.map(yao => (
                <span key={yao.position} className="mr-2 text-lg font-mono">
                  {yao.symbol}
                </span>
              ))}
            </div>
            <p className="text-gray-500">（解卦功能待实现）</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
```

- [ ] **Step 2: 验证应用运行**

Run: `npm run dev`
Expected: 开发服务器启动，浏览器显示起卦界面

- [ ] **Step 3: 提交**

```bash
git add src/App.tsx
git commit -m "feat: integrate Divination into App"
```

### Task 7: 验证和测试

**Covers:** [S2, S3, S4, S5, S6, S7, S8, S9]

**Files:**
- Test: 手动测试所有功能

- [ ] **Step 1: 启动开发服务器**

Run: `npm run dev`
Expected: 开发服务器启动成功

- [ ] **Step 2: 测试铜钱抛掷**

操作：
1. 打开浏览器访问 http://localhost:5173
2. 选择一个问题类别并输入问题
3. 点击"开始占卜"按钮
4. 点击"抛掷铜钱"按钮
5. 验证铜钱动画效果
6. 验证三枚铜钱显示结果

预期结果：铜钱抛掷动画正常，结果显示正确

- [ ] **Step 3: 测试卦象显示**

操作：
1. 连续抛掷六次
2. 验证卦象从下往上显示
3. 验证老阳/老阴爻有特殊标记

预期结果：卦象显示正确，动爻标记正确

- [ ] **Step 4: 测试操作按钮**

操作：
1. 测试"重新开始"按钮
2. 测试"确认卦象"按钮

预期结果：按钮功能正常

- [ ] **Step 5: 测试响应式布局**

操作：
1. 调整浏览器窗口大小
2. 验证在不同屏幕尺寸下的布局

预期结果：布局自适应

- [ ] **Step 6: 提交最终代码**

```bash
git add .
git commit -m "feat: complete divination interface"
```

## 完成标准

1. ✅ 铜钱抛掷动画正常
2. ✅ 卦象显示正确
3. ✅ 操作按钮功能正常
4. ✅ 响应式布局正确
5. ✅ 所有组件正确集成
6. ✅ 代码通过ESLint检查
