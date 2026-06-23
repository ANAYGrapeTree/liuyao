# 界面美化与响应式设计 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use compose:subagent (recommended) or compose:execute to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 通过现代化的UI设计和响应式布局，提升六爻算命网站的用户体验。

**Architecture:** 使用 Tailwind CSS 的自定义主题功能，结合组件级样式优化，实现统一的视觉设计和响应式布局。

**Tech Stack:** React, TypeScript, Tailwind CSS

---

## Task 1: 更新 Tailwind 配置

**Covers:** [S2]

**Files:**
- Modify: `tailwind.config.js`

- [ ] **Step 1: 更新 tailwind.config.js**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Noto Serif SC', 'serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-soft': 'bounceSoft 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: 更新 index.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    @apply scroll-smooth;
  }
  
  body {
    @apply font-sans antialiased text-neutral-800;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-serif;
  }
}

@layer components {
  .btn {
    @apply px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2;
  }
  
  .btn-primary {
    @apply bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-soft hover:shadow-medium;
  }
  
  .btn-secondary {
    @apply bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500 shadow-soft hover:shadow-medium;
  }
  
  .btn-accent {
    @apply bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-500 shadow-soft hover:shadow-medium;
  }
  
  .btn-outline {
    @apply border-2 border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500;
  }
  
  .btn-ghost {
    @apply text-neutral-600 hover:bg-neutral-100 focus:ring-neutral-300;
  }
  
  .card {
    @apply bg-white rounded-xl shadow-soft p-6 transition-all duration-200;
  }
  
  .card-hover {
    @apply hover:shadow-medium hover:-translate-y-1;
  }
  
  .input {
    @apply w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200;
  }
  
  .input-error {
    @apply border-red-500 focus:ring-red-500;
  }
  
  .label {
    @apply block text-sm font-medium text-neutral-700 mb-2;
  }
  
  .container-responsive {
    @apply w-full mx-auto px-4 sm:px-6 lg:px-8;
  }
  
  .section {
    @apply py-8 sm:py-12 lg:py-16;
  }
  
  .grid-responsive {
    @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  
  .animate-in {
    animation: fade-in 0.5s ease-in-out;
  }
  
  .transition-base {
    @apply transition-all duration-200 ease-in-out;
  }
}
```

- [ ] **Step 3: 提交更改**

```bash
git add tailwind.config.js src/index.css
git commit -m "style: 更新 Tailwind 配置和全局样式，添加自定义主题和组件样式"
```

## Task 2: 优化 QuestionSelector 组件

**Covers:** [S3], [S4]

**Files:**
- Modify: `src/components/QuestionSelector.tsx`

- [ ] **Step 1: 更新 QuestionSelector.tsx**

```tsx
// src/components/QuestionSelector.tsx
import { useState } from 'react';
import { QuestionCategory, QuestionSelectorState } from '../types/question';
import { categories } from '../data/categories';
import { CategoryCard } from './CategoryCard';
import { QuestionInput } from './QuestionInput';

interface QuestionSelectorProps {
  onQuestionConfirm: (question: string, category: QuestionCategory) => void;
}

export function QuestionSelector({ onQuestionConfirm }: QuestionSelectorProps) {
  const [state, setState] = useState<QuestionSelectorState>({
    selectedCategory: null,
    question: '',
    showCustomInput: false
  });

  const handleCategoryClick = (category: QuestionCategory) => {
    setState({
      selectedCategory: category,
      question: '',
      showCustomInput: true
    });
  };

  const handleQuestionChange = (question: string) => {
    setState(prev => ({ ...prev, question }));
  };

  const handleConfirm = () => {
    if (state.selectedCategory && state.question.trim()) {
      onQuestionConfirm(state.question, state.selectedCategory);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="container-responsive section">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-800 mb-4 font-serif">
              六爻算命
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto">
              选择您想占卜的问题类别，开始您的六爻之旅
            </p>
          </div>
          
          <div className="grid-responsive mb-8">
            {categories.map((category, index) => (
              <div 
                key={category.id} 
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CategoryCard
                  category={category}
                  isSelected={state.selectedCategory?.id === category.id}
                  onClick={handleCategoryClick}
                />
              </div>
            ))}
          </div>
          
          {state.showCustomInput && state.selectedCategory && (
            <div className="animate-slide-up">
              <QuestionInput
                category={state.selectedCategory}
                question={state.question}
                onQuestionChange={handleQuestionChange}
                onConfirm={handleConfirm}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 提交更改**

```bash
git add src/components/QuestionSelector.tsx
git commit -m "style: 优化 QuestionSelector 组件，添加响应式布局和动画效果"
```

## Task 3: 优化 CategoryCard 组件

**Covers:** [S4]

**Files:**
- Modify: `src/components/CategoryCard.tsx`

- [ ] **Step 1: 更新 CategoryCard.tsx**

```tsx
// src/components/CategoryCard.tsx
import { QuestionCategory } from '../types/question';

interface CategoryCardProps {
  category: QuestionCategory;
  isSelected: boolean;
  onClick: (category: QuestionCategory) => void;
}

export function CategoryCard({ category, isSelected, onClick }: CategoryCardProps) {
  return (
    <div
      onClick={() => onClick(category)}
      className={`
        card card-hover cursor-pointer
        ${isSelected
          ? 'bg-primary-500 text-white shadow-medium scale-105 border-2 border-primary-400'
          : 'bg-white hover:bg-neutral-50 border-2 border-transparent'
        }
      `}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(category);
        }
      }}
      aria-pressed={isSelected}
    >
      <div className="text-4xl sm:text-5xl mb-3 transition-transform duration-200 group-hover:scale-110">
        {category.icon}
      </div>
      <h3 className={`text-xl font-semibold mb-2 font-serif ${isSelected ? 'text-white' : 'text-neutral-800'}`}>
        {category.name}
      </h3>
      <p className={`text-sm ${isSelected ? 'text-primary-100' : 'text-neutral-600'}`}>
        {category.description}
      </p>
    </div>
  );
}
```

- [ ] **Step 2: 提交更改**

```bash
git add src/components/CategoryCard.tsx
git commit -m "style: 优化 CategoryCard 组件，添加可访问性和悬停效果"
```

## Task 4: 优化 QuestionInput 组件

**Covers:** [S4]

**Files:**
- Modify: `src/components/QuestionInput.tsx`

- [ ] **Step 1: 更新 QuestionInput.tsx**

```tsx
// src/components/QuestionInput.tsx
import { QuestionCategory } from '../types/question';

interface QuestionInputProps {
  category: QuestionCategory;
  question: string;
  onQuestionChange: (question: string) => void;
  onConfirm: () => void;
}

export function QuestionInput({ category, question, onQuestionChange, onConfirm }: QuestionInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onConfirm();
    }
  };

  return (
    <div className="card max-w-2xl mx-auto animate-scale-in">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-neutral-800 mb-2 font-serif">
          请输入您的问题
        </h3>
        <p className="text-sm text-neutral-600">
          类别：{category.name}
        </p>
      </div>
      
      <div className="mb-6">
        <label htmlFor="question-input" className="label">
          问题描述
        </label>
        <textarea
          id="question-input"
          className="input min-h-[120px] resize-none"
          placeholder={`请输入关于${category.name}的问题...`}
          value={question}
          onChange={(e) => onQuestionChange(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-describedby="question-help"
        />
        <p id="question-help" className="mt-2 text-sm text-neutral-500">
          请尽量具体地描述您的问题，以便获得更准确的解读
        </p>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={onConfirm}
          disabled={!question.trim()}
          className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          确认问题
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 提交更改**

```bash
git add src/components/QuestionInput.tsx
git commit -m "style: 优化 QuestionInput 组件，添加表单样式和键盘导航"
```

## Task 5: 优化 Divination 组件

**Covers:** [S3], [S4], [S5]

**Files:**
- Modify: `src/components/Divination.tsx`
- Modify: `src/components/Coin.tsx`
- Modify: `src/components/YaoLine.tsx`

- [ ] **Step 1: 更新 Coin.tsx**

```tsx
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
```

- [ ] **Step 2: 更新 YaoLine.tsx**

```tsx
// src/components/YaoLine.tsx
import { Yao } from '../types/divination';

interface YaoLineProps {
  yao: Yao;
  index: number;
}

export function YaoLine({ yao, index }: YaoLineProps) {
  const isYang = yao.type === 'yang' || yao.type === 'old_yang';
  const isChanging = yao.type === 'old_yang' || yao.type === 'old_yin';
  
  return (
    <div className="flex items-center justify-center space-x-4 py-2">
      <div className="w-8 text-right text-sm font-medium text-neutral-600">
        {index + 1}
      </div>
      
      <div className="flex space-x-1">
        {isYang ? (
          <div className="w-16 sm:w-20 h-3 bg-neutral-800 rounded-full" />
        ) : (
          <>
            <div className="w-7 sm:w-9 h-3 bg-neutral-800 rounded-full" />
            <div className="w-7 sm:w-9 h-3 bg-neutral-800 rounded-full" />
          </>
        )}
      </div>
      
      {isChanging && (
        <div className="text-accent-500 font-bold animate-pulse">
          O
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: 更新 Divination.tsx**

```tsx
// src/components/Divination.tsx
import { useState, useEffect } from 'react';
import { Yao } from '../types/divination';
import { Coin } from './Coin';
import { YaoLine } from './YaoLine';

interface DivinationProps {
  onDivinationComplete: (yaoArray: Yao[]) => void;
  onBack: () => void;
}

export function Divination({ onDivinationComplete, onBack }: DivinationProps) {
  const [yaoArray, setYaoArray] = useState<Yao[]>([]);
  const [currentYao, setCurrentYao] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [coinResults, setCoinResults] = useState<('head' | 'tail')[]>([]);
  const [showResult, setShowResult] = useState(false);

  const tossCoins = () => {
    if (isAnimating || currentYao >= 6) return;
    
    setIsAnimating(true);
    setCoinResults([]);
    
    const results: ('head' | 'tail')[] = [];
    for (let i = 0; i < 3; i++) {
      results.push(Math.random() > 0.5 ? 'head' : 'tail');
    }
    
    setTimeout(() => {
      setCoinResults(results);
      setIsAnimating(false);
      
      const headCount = results.filter(r => r === 'head').length;
      let yaoType: 'yang' | 'yin' | 'old_yang' | 'old_yin';
      
      if (headCount === 3) {
        yaoType = 'old_yang';
      } else if (headCount === 0) {
        yaoType = 'old_yin';
      } else if (headCount === 2) {
        yaoType = 'yang';
      } else {
        yaoType = 'yin';
      }
      
      const newYao: Yao = {
        type: yaoType,
        changing: yaoType === 'old_yang' || yaoType === 'old_yin'
      };
      
      setYaoArray(prev => [...prev, newYao]);
      setCurrentYao(prev => prev + 1);
      
      if (currentYao === 5) {
        setTimeout(() => {
          setShowResult(true);
        }, 500);
      }
    }, 1500);
  };

  const handleComplete = () => {
    onDivinationComplete(yaoArray);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="container-responsive section">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-8 animate-fade-in">
            <button
              onClick={onBack}
              className="btn btn-ghost mr-4"
            >
              ← 返回
            </button>
            <h1 className="text-3xl font-bold text-neutral-800 font-serif">
              起卦
            </h1>
          </div>
          
          <div className="card mb-8 animate-slide-up">
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-neutral-800 mb-2 font-serif">
                铜钱摇卦法
              </h2>
              <p className="text-neutral-600">
                请点击下方按钮开始摇卦，共需摇六次
              </p>
            </div>
            
            <div className="flex justify-center space-x-4 mb-8">
              {coinResults.map((result, index) => (
                <Coin
                  key={index}
                  isAnimating={isAnimating}
                  result={result}
                />
              ))}
              
              {coinResults.length === 0 && (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-dashed border-neutral-300 flex items-center justify-center">
                  <span className="text-neutral-400">?</span>
                </div>
              )}
            </div>
            
            <div className="text-center">
              <button
                onClick={tossCoins}
                disabled={isAnimating || currentYao >= 6}
                className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnimating ? '摇卦中...' : currentYao >= 6 ? '摇卦完成' : '开始摇卦'}
              </button>
            </div>
          </div>
          
          <div className="card animate-slide-up">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4 font-serif">
              卦象显示
            </h3>
            
            <div className="space-y-2">
              {yaoArray.map((yao, index) => (
                <YaoLine key={index} yao={yao} index={index} />
              ))}
              
              {Array.from({ length: 6 - yaoArray.length }).map((_, index) => (
                <div key={`empty-${index}`} className="flex items-center justify-center py-2">
                  <div className="w-16 sm:w-20 h-3 bg-neutral-200 rounded-full" />
                </div>
              ))}
            </div>
          </div>
          
          {showResult && (
            <div className="mt-8 text-center animate-scale-in">
              <button
                onClick={handleComplete}
                className="btn btn-secondary"
              >
                继续排卦
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: 提交更改**

```bash
git add src/components/Divination.tsx src/components/Coin.tsx src/components/YaoLine.tsx
git commit -m "style: 优化起卦相关组件，添加动画效果和响应式设计"
```

## Task 6: 优化 PaiGua 组件

**Covers:** [S3], [S4]

**Files:**
- Modify: `src/components/PaiGua.tsx`

- [ ] **Step 1: 更新 PaiGua.tsx**

```tsx
// src/components/PaiGua.tsx
import { Yao } from '../types/divination';
import { PaiGuaResult } from '../types/paigua';
import { YaoLine } from './YaoLine';

interface PaiGuaProps {
  yaoArray: Yao[];
  onBack: () => void;
  onComplete: (result: PaiGuaResult) => void;
}

export function PaiGua({ yaoArray, onBack, onComplete }: PaiGuaProps) {
  const generatePaiGuaResult = (): PaiGuaResult => {
    return {
      guaName: '示例卦',
      guaSymbol: '☰',
      yaoArray: yaoArray,
      dizhi: ['子', '丑', '寅', '卯', '辰', '巳'],
      liuqin: ['父母', '兄弟', '子孙', '妻财', '官鬼', '兄弟'],
      liushen: ['青龙', '朱雀', '勾陈', '螣蛇', '白虎', '玄武'],
      shiYing: { shi: 1, ying: 4 }
    };
  };

  const handleComplete = () => {
    const result = generatePaiGuaResult();
    onComplete(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="container-responsive section">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-8 animate-fade-in">
            <button
              onClick={onBack}
              className="btn btn-ghost mr-4"
            >
              ← 返回
            </button>
            <h1 className="text-3xl font-bold text-neutral-800 font-serif">
              排卦
            </h1>
          </div>
          
          <div className="card mb-8 animate-slide-up">
            <h2 className="text-xl font-semibold text-neutral-800 mb-6 font-serif">
              卦象信息
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-medium text-neutral-700 mb-2">卦名</h3>
                <p className="text-2xl font-bold text-primary-600">示例卦</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-neutral-700 mb-2">卦象</h3>
                <p className="text-4xl">☰</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium text-neutral-700 mb-3">爻象</h3>
              <div className="space-y-2">
                {yaoArray.map((yao, index) => (
                  <YaoLine key={index} yao={yao} index={index} />
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-neutral-700 mb-2">地支</h3>
                <div className="flex flex-wrap gap-2">
                  {['子', '丑', '寅', '卯', '辰', '巳'].map((dizhi, index) => (
                    <span key={index} className="px-3 py-1 bg-neutral-100 rounded-full text-sm">
                      {dizhi}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-neutral-700 mb-2">六亲</h3>
                <div className="flex flex-wrap gap-2">
                  {['父母', '兄弟', '子孙', '妻财', '官鬼', '兄弟'].map((liuqin, index) => (
                    <span key={index} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                      {liuqin}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-neutral-700 mb-2">六神</h3>
                <div className="flex flex-wrap gap-2">
                  {['青龙', '朱雀', '勾陈', '螣蛇', '白虎', '玄武'].map((liushen, index) => (
                    <span key={index} className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm">
                      {liushen}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-neutral-700 mb-2">世应</h3>
                <div className="flex space-x-4">
                  <div className="text-center">
                    <p className="text-sm text-neutral-600">世</p>
                    <p className="text-xl font-bold text-accent-600">1</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-neutral-600">应</p>
                    <p className="text-xl font-bold text-accent-600">4</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center animate-slide-up">
            <button
              onClick={handleComplete}
              className="btn btn-secondary"
            >
              继续解卦
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 提交更改**

```bash
git add src/components/PaiGua.tsx
git commit -m "style: 优化 PaiGua 组件，添加响应式网格布局"
```

## Task 7: 优化 JieGua 组件

**Covers:** [S3], [S4]

**Files:**
- Modify: `src/components/JieGua.tsx`

- [ ] **Step 1: 更新 JieGua.tsx**

```tsx
// src/components/JieGua.tsx
import { PaiGuaResult } from '../types/paigua';

interface JieGuaProps {
  paiguaResult: PaiGuaResult;
  questionType: string;
  onBack: () => void;
}

export function JieGua({ paiguaResult, questionType, onBack }: JieGuaProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="container-responsive section">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-8 animate-fade-in">
            <button
              onClick={onBack}
              className="btn btn-ghost mr-4"
            >
              ← 返回
            </button>
            <h1 className="text-3xl font-bold text-neutral-800 font-serif">
              解卦
            </h1>
          </div>
          
          <div className="card mb-8 animate-slide-up">
            <h2 className="text-xl font-semibold text-neutral-800 mb-6 font-serif">
              卦象解读
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-neutral-700 mb-2">用神分析</h3>
                <p className="text-neutral-600">
                  根据问题类型 "{questionType}"，用神为相应的六亲。
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-neutral-700 mb-2">旺衰判断</h3>
                <p className="text-neutral-600">
                  分析用神在月建、日辰中的旺衰情况。
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-neutral-700 mb-2">吉凶评分</h3>
                <div className="flex items-center space-x-4">
                  <div className="w-32 h-4 bg-neutral-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-secondary-500 transition-all duration-500"
                      style={{ width: '70%' }}
                    />
                  </div>
                  <span className="text-lg font-bold text-secondary-600">70分</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center animate-slide-up">
            <button
              onClick={() => {}}
              className="btn btn-accent"
            >
              获取AI解读
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 提交更改**

```bash
git add src/components/JieGua.tsx
git commit -m "style: 优化 JieGua 组件，添加进度条和动画效果"
```

## Task 8: 优化 AIInterpretation 组件

**Covers:** [S3], [S4], [S5]

**Files:**
- Modify: `src/components/AIInterpretation.tsx`

- [ ] **Step 1: 更新 AIInterpretation.tsx**

```tsx
// src/components/AIInterpretation.tsx
import { useState } from 'react';
import { PaiGuaResult } from '../types/paigua';

interface AIInterpretationProps {
  paiguaResult: PaiGuaResult;
  question: string;
  questionType: string;
  onBack: () => void;
}

export function AIInterpretation({ paiguaResult, question, questionType, onBack }: AIInterpretationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [interpretation, setInterpretation] = useState('');

  const generateInterpretation = async () => {
    setIsLoading(true);
    setInterpretation('');
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setInterpretation(`
      根据您的卦象分析：
      
      问题：${question}
      类型：${questionType}
      
      卦象显示，当前运势较为平稳。用神得力，预示着事情会向好的方向发展。
      
      建议：
      1. 保持积极心态
      2. 把握时机
      3. 注意细节
      
      总体评分：75分（良好）
    `);
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="container-responsive section">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-8 animate-fade-in">
            <button
              onClick={onBack}
              className="btn btn-ghost mr-4"
            >
              ← 返回
            </button>
            <h1 className="text-3xl font-bold text-neutral-800 font-serif">
              AI解读
            </h1>
          </div>
          
          <div className="card mb-8 animate-slide-up">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">🤖</span>
              </div>
              <h2 className="text-xl font-semibold text-neutral-800 mb-2 font-serif">
                AI智能解读
              </h2>
              <p className="text-neutral-600">
                基于您的卦象，AI将为您提供详细的解读
              </p>
            </div>
            
            {!interpretation && !isLoading && (
              <div className="text-center">
                <button
                  onClick={generateInterpretation}
                  className="btn btn-primary"
                >
                  开始解读
                </button>
              </div>
            )}
            
            {isLoading && (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
                <p className="text-neutral-600">AI正在分析您的卦象...</p>
              </div>
            )}
            
            {interpretation && (
              <div className="animate-fade-in">
                <div className="bg-neutral-50 rounded-lg p-6 whitespace-pre-wrap text-neutral-700">
                  {interpretation}
                </div>
                
                <div className="mt-6 text-center">
                  <button
                    onClick={generateInterpretation}
                    className="btn btn-outline mr-4"
                  >
                    重新解读
                  </button>
                  <button
                    onClick={onBack}
                    className="btn btn-ghost"
                  >
                    返回
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 提交更改**

```bash
git add src/components/AIInterpretation.tsx
git commit -m "style: 优化 AIInterpretation 组件，添加加载动画和过渡效果"
```

## Task 9: 更新 App.tsx 主组件

**Covers:** [S3], [S5]

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: 更新 App.tsx**

```tsx
// src/App.tsx
import { useState } from 'react';
import { QuestionSelector } from './components/QuestionSelector';
import { Divination } from './components/Divination';
import { PaiGua } from './components/PaiGua';
import { JieGua } from './components/JieGua';
import { AIInterpretation } from './components/AIInterpretation';
import { QuestionCategory } from './types/question';
import { Yao } from './types/divination';
import { PaiGuaResult } from './types/paigua';

function App() {
  const [currentStep, setCurrentStep] = useState<'question' | 'divination' | 'paigua' | 'jiehua' | 'ai' | 'result'>('question');
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory | null>(null);
  const [divinationResult, setDivinationResult] = useState<Yao[]>([]);
  const [paiguaResult, setPaiguaResult] = useState<PaiGuaResult | null>(null);

  const handleQuestionConfirm = (question: string, category: QuestionCategory) => {
    setSelectedQuestion(question);
    setSelectedCategory(category);
    setCurrentStep('divination');
  };

  const handleDivinationComplete = (yaoArray: Yao[]) => {
    setDivinationResult(yaoArray);
    setCurrentStep('paigua');
  };

  const handlePaiguaComplete = (result: PaiGuaResult) => {
    setPaiguaResult(result);
    setCurrentStep('jiehua');
  };

  const handleJieGuaComplete = () => {
    setCurrentStep('ai');
  };

  const handleBackToQuestion = () => {
    setCurrentStep('question');
  };

  const handleBackToDivination = () => {
    setCurrentStep('divination');
  };

  const handleBackToPaiGua = () => {
    setCurrentStep('paigua');
  };

  const handleBackToJieGua = () => {
    setCurrentStep('jiehua');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="animate-fade-in">
        {currentStep === 'question' && (
          <QuestionSelector onQuestionConfirm={handleQuestionConfirm} />
        )}
        
        {currentStep === 'divination' && (
          <Divination
            onDivinationComplete={handleDivinationComplete}
            onBack={handleBackToQuestion}
          />
        )}
        
        {currentStep === 'paigua' && (
          <PaiGua
            yaoArray={divinationResult}
            onBack={handleBackToDivination}
            onComplete={handlePaiguaComplete}
          />
        )}
        
        {currentStep === 'jiehua' && paiguaResult && selectedCategory && (
          <JieGua
            paiguaResult={paiguaResult}
            questionType={selectedCategory.id}
            onBack={handleBackToPaiGua}
          />
        )}
        
        {currentStep === 'ai' && paiguaResult && selectedCategory && (
          <AIInterpretation
            paiguaResult={paiguaResult}
            question={selectedQuestion}
            questionType={selectedCategory.id}
            onBack={handleBackToJieGua}
          />
        )}
      </div>
    </div>
  );
}

export default App;
```

- [ ] **Step 2: 提交更改**

```bash
git add src/App.tsx
git commit -m "style: 更新 App 主组件，添加页面过渡动画"
```

## Task 10: 验证和测试

**Covers:** [S8]

**Files:**
- None

- [ ] **Step 1: 运行开发服务器**

```bash
npm run dev
```

- [ ] **Step 2: 测试响应式布局**

在浏览器中测试不同屏幕尺寸下的布局效果：
- 桌面端（> 1024px）
- 平板端（640px - 1024px）
- 移动端（< 640px）

- [ ] **Step 3: 测试动画效果**

测试所有动画效果是否正常工作：
- 页面切换动画
- 组件出现动画
- 悬停效果动画
- 加载动画

- [ ] **Step 4: 测试可访问性**

测试键盘导航和屏幕阅读器支持：
- 焦点状态可见
- 键盘操作支持
- 焦点顺序合理

- [ ] **Step 5: 提交最终更改**

```bash
git add .
git commit -m "style: 完成界面美化与响应式设计"
```