# 问题选择界面设计文档

## [S1] 概述

问题选择界面是六爻算命网站的入口，用户在此界面选择或输入要占卜的问题，然后进入起卦步骤。

## [S2] 界面布局

### 主要区域
1. **标题区域**：显示"六爻算命"标题和简短说明
2. **问题类别选择区域**：显示预设的问题类别卡片
3. **自定义问题输入区域**：提供文本输入框让用户自定义问题
4. **开始占卜按钮**：用户选择问题后点击进入下一步

### 响应式设计
- 移动端：单列布局，卡片垂直排列
- 桌面端：多列网格布局，卡片水平排列

## [S3] 问题类别

预设5个问题类别，每个类别包含：
- 类别名称
- 类别图标（使用emoji）
- 简短描述
- 典型问题示例

### 类别列表
1. **情感运势** ❤️
   - 描述：感情、婚姻、桃花运
   - 示例：我和他/她的感情会如何发展？

2. **事业运势** 💼
   - 描述：工作、升职、跳槽、创业
   - 示例：我最近适合换工作吗？

3. **财运** 💰
   - 描述：投资、理财、收入、生意
   - 示例：我近期的财运如何？

4. **健康** 🏥
   - 描述：身体健康、疾病、康复
   - 示例：我的身体状况需要注意什么？

5. **学业** 📚
   - 描述：考试、升学、学习、培训
   - 示例：我这次考试能通过吗？

## [S4] 交互流程

1. 用户进入页面，看到问题类别卡片
2. 用户可以点击选择一个类别
3. 选择后，显示该类别的典型问题示例
4. 用户可以修改示例问题或输入自定义问题
5. 确认问题后，点击"开始占卜"按钮
6. 进入起卦界面

## [S5] 状态管理

使用React useState管理以下状态：
- `selectedCategory`: 当前选中的类别
- `question`: 用户输入的问题文本
- `showCustomInput`: 是否显示自定义输入框

## [S6] 组件结构

```
QuestionSelector
├── Header (标题和说明)
├── CategoryGrid (类别卡片网格)
│   └── CategoryCard (单个类别卡片)
├── QuestionInput (问题输入区域)
│   ├── ExampleQuestions (示例问题)
│   └── CustomInput (自定义输入框)
└── StartButton (开始占卜按钮)
```

## [S7] 样式设计

使用Tailwind CSS实现：
- 现代简约风格
- 卡片式设计，带圆角和阴影
- 渐变背景
- 响应式布局
- 平滑的过渡动画

## [S8] 数据结构

```typescript
interface QuestionCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  examples: string[];
}

interface QuestionSelectorState {
  selectedCategory: QuestionCategory | null;
  question: string;
  showCustomInput: boolean;
}
```
