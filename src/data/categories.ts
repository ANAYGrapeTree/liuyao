// src/data/categories.ts
import type { QuestionCategory } from '../types/question';

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
