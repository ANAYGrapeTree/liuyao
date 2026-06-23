# 问题选择界面实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use compose:subagent (recommended) or compose:execute to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现六爻算命网站的问题选择界面，让用户可以选择预设问题类别或输入自定义问题

**Architecture:** 使用React组件化架构，创建QuestionSelector组件及其子组件，使用Tailwind CSS进行样式设计

**Tech Stack:** React, TypeScript, Tailwind CSS

---

## 文件结构

在开始定义任务之前，先规划要创建或修改的文件及其职责：

- `src/types/question.ts` - 问题相关的类型定义
- `src/data/categories.ts` - 问题类别数据
- `src/components/QuestionSelector.tsx` - 主问题选择器组件
- `src/components/CategoryCard.tsx` - 类别卡片组件
- `src/components/QuestionInput.tsx` - 问题输入组件
- `src/App.tsx` - 修改主应用组件，集成问题选择器

## 任务分解

### Task 1: 创建类型定义文件

**Covers:** [S6]

**Files:**
- Create: `src/types/question.ts`

- [ ] **Step 1: 创建类型定义文件**

```typescript
// src/types/question.ts
export interface QuestionCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  examples: string[];
}

export interface QuestionSelectorState {
  selectedCategory: QuestionCategory | null;
  question: string;
  showCustomInput: boolean;
}
```

- [ ] **Step 2: 验证文件创建**

Run: `ls -la src/types/`
Expected: 看到 question.ts 文件

- [ ] **Step 3: 提交**

```bash
git add src/types/question.ts
git commit -m "feat: add question type definitions"
```

### Task 2: 创建问题类别数据

**Covers:** [S3]

**Files:**
- Create: `src/data/categories.ts`

- [ ] **Step 1: 创建问题类别数据**

```typescript
// src/data/categories.ts
import { QuestionCategory } from '../types/question';

export const categories: QuestionCategory[] = [
  {
    id: 'love',
    name: '情感运势',
    icon: '❤️',
    description: '感情、婚姻、桃花运',
    examples: [
      '我和他/她的感情会如何发展？',
      '我最近有桃花运吗？',
      '我们适合结婚吗？'
    ]
  },
  {
    id: 'career',
    name: '事业运势',
    icon: '💼',
    description: '工作、升职、跳槽、创业',
    examples: [
      '我最近适合换工作吗？',
      '我今年能升职吗？',
      '创业项目会成功吗？'
    ]
  },
  {
    id: 'wealth',
    name: '财运',
    icon: '💰',
    description: '投资、理财、收入、生意',
    examples: [
      '我近期的财运如何？',
      '这个投资项目靠谱吗？',
      '我今年收入会增加吗？'
    ]
  },
  {
    id: 'health',
    name: '健康',
    icon: '🏥',
    description: '身体健康、疾病、康复',
    examples: [
      '我的身体状况需要注意什么？',
      '这个手术会顺利吗？',
      '我的健康运势如何？'
    ]
  },
  {
    id: 'study',
    name: '学业',
    icon: '📚',
    description: '考试、升学、学习、培训',
    examples: [
      '我这次考试能通过吗？',
      '我适合考研吗？',
      '我的学习运势如何？'
    ]
  }
];
```

- [ ] **Step 2: 验证文件创建**

Run: `ls -la src/data/`
Expected: 看到 categories.ts 文件

- [ ] **Step 3: 提交**

```bash
git add src/data/categories.ts
git commit -m "feat: add question category data"
```

### Task 3: 创建类别卡片组件

**Covers:** [S3, S7]

**Files:**
- Create: `src/components/CategoryCard.tsx`

- [ ] **Step 1: 创建CategoryCard组件**

```typescript
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
        p-6 rounded-xl cursor-pointer transition-all duration-200
        ${isSelected
          ? 'bg-blue-500 text-white shadow-lg scale-105'
          : 'bg-white hover:bg-gray-50 shadow-md hover:shadow-lg'
        }
      `}
    >
      <div className="text-4xl mb-3">{category.icon}</div>
      <h3 className={`text-xl font-semibold mb-2 ${isSelected ? 'text-white' : 'text-gray-800'}`}>
        {category.name}
      </h3>
      <p className={`text-sm ${isSelected ? 'text-blue-100' : 'text-gray-600'}`}>
        {category.description}
      </p>
    </div>
  );
}
```

- [ ] **Step 2: 验证组件创建**

Run: `ls -la src/components/`
Expected: 看到 CategoryCard.tsx 文件

- [ ] **Step 3: 提交**

```bash
git add src/components/CategoryCard.tsx
git commit -m "feat: add CategoryCard component"
```

### Task 4: 创建问题输入组件

**Covers:** [S2, S3]

**Files:**
- Create: `src/components/QuestionInput.tsx`

- [ ] **Step 1: 创建QuestionInput组件**

```typescript
// src/components/QuestionInput.tsx
import { QuestionCategory } from '../types/question';

interface QuestionInputProps {
  category: QuestionCategory;
  question: string;
  onQuestionChange: (question: string) => void;
  onConfirm: () => void;
}

export function QuestionInput({ category, question, onQuestionChange, onConfirm }: QuestionInputProps) {
  return (
    <div className="mt-8 p-6 bg-white rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {category.icon} {category.name} - 请输入您的问题
      </h3>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">您可以选择以下示例问题：</p>
        <div className="flex flex-wrap gap-2">
          {category.examples.map((example, index) => (
            <button
              key={index}
              onClick={() => onQuestionChange(example)}
              className={`
                px-3 py-1 rounded-full text-sm transition-colors
                ${question === example
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {example}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          或输入您的自定义问题：
        </label>
        <textarea
          value={question}
          onChange={(e) => onQuestionChange(e.target.value)}
          placeholder="请输入您想占卜的问题..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>
      
      <button
        onClick={onConfirm}
        disabled={!question.trim()}
        className={`
          w-full py-3 px-6 rounded-lg font-semibold transition-all
          ${question.trim()
            ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }
        `}
      >
        开始占卜
      </button>
    </div>
  );
}
```

- [ ] **Step 2: 验证组件创建**

Run: `ls -la src/components/`
Expected: 看到 QuestionInput.tsx 文件

- [ ] **Step 3: 提交**

```bash
git add src/components/QuestionInput.tsx
git commit -m "feat: add QuestionInput component"
```

### Task 5: 创建主问题选择器组件

**Covers:** [S2, S3, S4, S5]

**Files:**
- Create: `src/components/QuestionSelector.tsx`

- [ ] **Step 1: 创建QuestionSelector组件**

```typescript
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">六爻算命</h1>
          <p className="text-lg text-gray-600">
            选择您想占卜的问题类别，开始您的六爻之旅
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {categories.map(category => (
            <CategoryCard
              key={category.id}
              category={category}
              isSelected={state.selectedCategory?.id === category.id}
              onClick={handleCategoryClick}
            />
          ))}
        </div>
        
        {state.showCustomInput && state.selectedCategory && (
          <QuestionInput
            category={state.selectedCategory}
            question={state.question}
            onQuestionChange={handleQuestionChange}
            onConfirm={handleConfirm}
          />
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 验证组件创建**

Run: `ls -la src/components/`
Expected: 看到 QuestionSelector.tsx 文件

- [ ] **Step 3: 提交**

```bash
git add src/components/QuestionSelector.tsx
git commit -m "feat: add QuestionSelector component"
```

### Task 6: 修改主应用组件

**Covers:** [S2, S4]

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: 修改App.tsx集成问题选择器**

```typescript
// src/App.tsx
import { useState } from 'react';
import { QuestionSelector } from './components/QuestionSelector';
import { QuestionCategory } from './types/question';

function App() {
  const [currentStep, setCurrentStep] = useState<'question' | 'divination' | 'result'>('question');
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory | null>(null);

  const handleQuestionConfirm = (question: string, category: QuestionCategory) => {
    setSelectedQuestion(question);
    setSelectedCategory(category);
    setCurrentStep('divination');
    // 这里将来会跳转到起卦界面
    console.log('问题确认:', question, '类别:', category.name);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {currentStep === 'question' && (
        <QuestionSelector onQuestionConfirm={handleQuestionConfirm} />
      )}
      
      {currentStep === 'divination' && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">起卦界面</h2>
            <p className="text-gray-600 mb-4">问题：{selectedQuestion}</p>
            <p className="text-gray-600 mb-4">类别：{selectedCategory?.name}</p>
            <p className="text-gray-500">（起卦功能待实现）</p>
          </div>
        </div>
      )}
      
      {currentStep === 'result' && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">解卦结果</h2>
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
Expected: 开发服务器启动，浏览器显示问题选择界面

- [ ] **Step 3: 提交**

```bash
git add src/App.tsx
git commit -m "feat: integrate QuestionSelector into App"
```

### Task 7: 验证和测试

**Covers:** [S2, S3, S4, S5, S6, S7]

**Files:**
- Test: 手动测试所有功能

- [ ] **Step 1: 启动开发服务器**

Run: `npm run dev`
Expected: 开发服务器启动成功

- [ ] **Step 2: 测试问题类别选择**

操作：
1. 打开浏览器访问 http://localhost:5173
2. 点击任意问题类别卡片
3. 验证卡片高亮显示
4. 验证问题输入区域显示

预期结果：类别卡片被选中，显示对应的问题输入区域

- [ ] **Step 3: 测试问题输入**

操作：
1. 点击示例问题按钮
2. 验证问题输入框自动填充
3. 手动输入自定义问题
4. 验证"开始占卜"按钮状态变化

预期结果：问题输入正常，按钮状态正确

- [ ] **Step 4: 测试响应式布局**

操作：
1. 调整浏览器窗口大小
2. 验证在不同屏幕尺寸下的布局

预期结果：布局自适应，移动端单列，桌面端多列

- [ ] **Step 5: 提交最终代码**

```bash
git add .
git commit -m "feat: complete question selection interface"
```

## 完成标准

1. ✅ 问题类别卡片正确显示
2. ✅ 类别选择交互正常
3. ✅ 问题输入功能正常
4. ✅ 响应式布局正确
5. ✅ 所有组件正确集成
6. ✅ 代码通过ESLint检查
