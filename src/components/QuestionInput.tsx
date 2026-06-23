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