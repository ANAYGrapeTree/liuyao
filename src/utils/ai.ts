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
