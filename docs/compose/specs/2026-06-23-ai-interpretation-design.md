# AI解读功能设计文档

## [S1] 概述

AI解读功能是六爻算命网站的高级分析模块，通过调用LLM API为用户提供更深入、个性化的卦象解读。

## [S2] API支持

### 用户MIMO API
- 支持用户输入自己的MIMO API密钥
- 使用用户的API进行解读
- 保护用户隐私

### 免费默认LLM API
- 提供免费的默认LLM API
- 无需用户配置即可使用
- 作为备选方案

## [S3] 解读流程

1. 用户选择使用MIMO API或默认API
2. 如果选择MIMO API，输入API密钥
3. 构建解读请求（包含卦象数据、问题信息）
4. 调用LLM API
5. 接收并显示解读结果

## [S4] 界面设计

### API选择区域
- 两个选项：使用MIMO API / 使用免费API
- MIMO API选项显示输入框
- 默认API选项无需配置

### 解读结果显示区域
- 加载状态显示
- 解读结果文本显示
- 保存/分享功能

### 响应式设计
- 移动端：垂直排列
- 桌面端：水平排列

## [S5] 数据结构

```typescript
interface AIConfig {
  useMimoApi: boolean;
  mimoApiKey: string;
}

interface AIInterpretationRequest {
  guaData: GuaData;
  question: string;
  questionType: string;
  paiguaResult: PaiGuaResult;
}

interface AIInterpretationResponse {
  content: string;
  timestamp: number;
}
```

## [S6] 组件结构

```
AIInterpretation
├── APISelector (API选择器)
│   ├── MimoApiOption (MIMO API选项)
│   └── DefaultApiOption (默认API选项)
├── InterpretationResult (解读结果)
│   ├── LoadingState (加载状态)
│   └── ResultContent (结果内容)
└── ActionButtons (操作按钮)
    ├── SaveButton (保存按钮)
    └── ShareButton (分享按钮)
```

## [S7] 样式设计

使用Tailwind CSS实现：
- API选择卡片样式
- 解读结果卡片样式
- 加载动画样式
- 响应式布局
