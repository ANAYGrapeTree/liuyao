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
