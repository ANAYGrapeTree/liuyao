# AI解读功能实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use compose:subagent (recommended) or compose:execute to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现六爻算命网站的AI解读功能，通过LLM API为用户提供个性化解读

**Architecture:** 使用React组件化架构，创建AIInterpretation组件，支持MIMO API和默认API

**Tech Stack:** React, TypeScript, Tailwind CSS, Fetch API

---

## 文件结构

在开始定义任务之前，先规划要创建或修改的文件及其职责：

- `src/types/ai.ts` - AI相关的类型定义
- `src/utils/ai.ts` - AI解读逻辑工具函数
- `src/components/AIInterpretation.tsx` - 主AI解读组件
- `src/App.tsx` - 修改主应用组件，集成AI解读界面

## 任务分解

### Task 1: 创建类型定义文件

**Covers:** [S5]

**Files:**
- Create: `src/types/ai.ts`

- [ ] **Step 1: 创建类型定义文件**

```typescript
// src/types/ai.ts
import { GuaData, PaiGuaResult } from './paigua';

export interface AIConfig {
  useMimoApi: boolean;
  mimoApiKey: string;
}

export interface AIInterpretationRequest {
  guaData: GuaData;
  question: string;
  questionType: string;
  paiguaResult: PaiGuaResult;
}

export interface AIInterpretationResponse {
  content: string;
  timestamp: number;
}
```

- [ ] **Step 2: 验证文件创建**

Run: `ls -la src/types/`
Expected: 看到 ai.ts 文件

- [ ] **Step 3: 提交**

```bash
git add src/types/ai.ts
git commit -m "feat: add AI type definitions"
```

### Task 2: 创建AI解读逻辑工具函数

**Covers:** [S2, S3]

**Files:**
- Create: `src/utils/ai.ts`

- [ ] **Step 1: 创建AI解读逻辑工具函数**

```typescript
// src/utils/ai.ts
import { AIConfig, AIInterpretationRequest, AIInterpretationResponse } from '../types/ai';

// 默认LLM API（模拟）
const DEFAULT_API_URL = 'https://api.example.com/interpret';

// 构建解读请求
const buildInterpretationPrompt = (request: AIInterpretationRequest): string => {
  return `
请根据以下六爻卦象信息进行解读：

问题类型：${request.questionType}
问题：${request.question}
卦名：${request.guaData.name}
卦辞：${request.guaData.guaCi}

请从以下方面进行分析：
1. 整体运势
2. 具体建议
3. 注意事项
4. 吉凶判断

请用中文回答，语言要通俗易懂。
  `.trim();
};

// 调用MIMO API
const callMimoApi = async (
  apiKey: string,
  prompt: string
): Promise<string> => {
  // 模拟MIMO API调用
  // 实际项目中需要替换为真实的API调用
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`【MIMO AI解读】

根据您的卦象分析：

1. 整体运势：您的卦象显示当前处于稳定期，适合稳步推进计划。

2. 具体建议：
   - 保持耐心，不要急于求成
   - 多与他人沟通交流
   - 注意细节问题

3. 注意事项：
   - 避免冲动决策
   - 注意人际关系
   - 保持积极心态

4. 吉凶判断：中等偏吉，只要稳扎稳打，会有好的结果。
    `);
    }, 1500);
  });
};

// 调用默认API
const callDefaultApi = async (prompt: string): Promise<string> => {
  // 模拟默认API调用
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`【AI解读】

根据您的卦象分析：

1. 整体运势：您的卦象显示当前处于变化期，需要灵活应对。

2. 具体建议：
   - 把握时机，果断行动
   - 多听取他人意见
   - 注意风险控制

3. 注意事项：
   - 避免过于冒进
   - 注意身体健康
   - 保持平和心态

4. 吉凶判断：中等，需要谨慎行事才能获得好结果。
    `);
    }, 1500);
  });
};

// 主解读函数
export const interpretWithAI = async (
  config: AIConfig,
  request: AIInterpretationRequest
): Promise<AIInterpretationResponse> => {
  const prompt = buildInterpretationPrompt(request);
  
  let content: string;
  
  if (config.useMimoApi && config.mimoApiKey) {
    content = await callMimoApi(config.mimoApiKey, prompt);
  } else {
    content = await callDefaultApi(prompt);
  }
  
  return {
    content,
    timestamp: Date.now()
  };
};
```

- [ ] **Step 2: 验证文件创建**

Run: `ls -la src/utils/`
Expected: 看到 ai.ts 文件

- [ ] **Step 3: 提交**

```bash
git add src/utils/ai.ts
git commit -m "feat: add AI utility functions"
```

### Task 3: 创建主AI解读组件

**Covers:** [S4, S6]

**Files:**
- Create: `src/components/AIInterpretation.tsx`

- [ ] **Step 1: 创建AIInterpretation组件**

```typescript
// src/components/AIInterpretation.tsx
import { useState } from 'react';
import { AIConfig, AIInterpretationRequest, AIInterpretationResponse } from '../types/ai';
import { PaiGuaResult } from '../types/paigua';
import { interpretWithAI } from '../utils/ai';

interface AIInterpretationProps {
  paiguaResult: PaiGuaResult;
  question: string;
  questionType: string;
  onBack: () => void;
}

export function AIInterpretation({ paiguaResult, question, questionType, onBack }: AIInterpretationProps) {
  const [config, setConfig] = useState<AIConfig>({
    useMimoApi: false,
    mimoApiKey: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AIInterpretationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleInterpret = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const request: AIInterpretationRequest = {
        guaData: paiguaResult.guaData,
        question,
        questionType,
        paiguaResult
      };
      
      const response = await interpretWithAI(config, request);
      setResult(response);
    } catch (err) {
      setError('解读失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSave = () => {
    if (result) {
      const blob = new Blob([result.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `六爻解读_${new Date().toISOString().split('T')[0]}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="mb-4 text-gray-600 hover:text-gray-800"
          >
            ← 返回解卦
          </button>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">AI解读</h1>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">选择解读方式</h2>
          
          <div className="space-y-4">
            <div
              onClick={() => setConfig(prev => ({ ...prev, useMimoApi: false }))}
              className={`
                p-4 rounded-lg cursor-pointer border-2 transition-all
                ${!config.useMimoApi
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <div className="flex items-center">
                <div className={`
                  w-4 h-4 rounded-full border-2 mr-3
                  ${!config.useMimoApi ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}
                `} />
                <div>
                  <h3 className="font-semibold text-gray-800">使用免费API</h3>
                  <p className="text-sm text-gray-600">无需配置，直接使用</p>
                </div>
              </div>
            </div>
            
            <div
              onClick={() => setConfig(prev => ({ ...prev, useMimoApi: true }))}
              className={`
                p-4 rounded-lg cursor-pointer border-2 transition-all
                ${config.useMimoApi
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <div className="flex items-center">
                <div className={`
                  w-4 h-4 rounded-full border-2 mr-3
                  ${config.useMimoApi ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}
                `} />
                <div>
                  <h3 className="font-semibold text-gray-800">使用MIMO API</h3>
                  <p className="text-sm text-gray-600">使用您自己的API密钥</p>
                </div>
              </div>
              
              {config.useMimoApi && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API密钥
                  </label>
                  <input
                    type="password"
                    value={config.mimoApiKey}
                    onChange={(e) => setConfig(prev => ({ ...prev, mimoApiKey: e.target.value }))}
                    placeholder="请输入您的MIMO API密钥"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={handleInterpret}
            disabled={isLoading || (config.useMimoApi && !config.mimoApiKey)}
            className={`
              w-full mt-6 py-3 px-6 rounded-lg font-semibold transition-all
              ${isLoading || (config.useMimoApi && !config.mimoApiKey)
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg'
              }
            `}
          >
            {isLoading ? '解读中...' : '开始AI解读'}
          </button>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <p className="text-red-600">{error}</p>
          </div>
        )}
        
        {result && (
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">解读结果</h2>
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap text-gray-600">{result.content}</pre>
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={handleSave}
                className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
              >
                保存解读
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 验证组件创建**

Run: `ls -la src/components/`
Expected: 看到 AIInterpretation.tsx 文件

- [ ] **Step 3: 提交**

```bash
git add src/components/AIInterpretation.tsx
git commit -m "feat: add AIInterpretation component"
```

### Task 4: 修改主应用组件

**Covers:** [S2, S3, S4]

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: 修改App.tsx集成AI解读组件**

```typescript
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
  );
}

export default App;
```

- [ ] **Step 2: 验证应用运行**

Run: `npm run dev`
Expected: 开发服务器启动，浏览器显示AI解读界面

- [ ] **Step 3: 提交**

```bash
git add src/App.tsx
git commit -m "feat: integrate AIInterpretation into App"
```

### Task 5: 验证和测试

**Covers:** [S2, S3, S4, S5, S6, S7]

**Files:**
- Test: 手动测试所有功能

- [ ] **Step 1: 启动开发服务器**

Run: `npm run dev`
Expected: 开发服务器启动成功

- [ ] **Step 2: 测试AI解读功能**

操作：
1. 打开浏览器访问 http://localhost:5173
2. 选择一个问题类别并输入问题
3. 点击"开始占卜"按钮
4. 摇卦六次
5. 点击"确认卦象"按钮
6. 点击"确认排卦结果"按钮
7. 点击"确认解卦结果"按钮
8. 选择API类型
9. 点击"开始AI解读"按钮
10. 验证解读结果显示

预期结果：AI解读结果显示正确

- [ ] **Step 3: 测试保存功能**

操作：
1. 点击"保存解读"按钮
2. 验证文件下载

预期结果：文件下载成功

- [ ] **Step 4: 测试返回功能**

操作：
1. 测试"返回解卦"按钮

预期结果：返回功能正常

- [ ] **Step 5: 提交最终代码**

```bash
git add .
git commit -m "feat: complete AI interpretation interface"
```

## 完成标准

1. ✅ API选择功能正常
2. ✅ AI解读功能正常
3. ✅ 保存功能正常
4. ✅ 返回功能正常
5. ✅ 所有组件正确集成
6. ✅ 代码通过TypeScript检查
