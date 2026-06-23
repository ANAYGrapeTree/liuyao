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
