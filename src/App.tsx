// src/App.tsx
import { useState } from 'react';
import { QuestionSelector } from './components/QuestionSelector';
import { Divination } from './components/Divination';
import { QuestionCategory } from './types/question';
import { Yao } from './types/divination';

function App() {
  const [currentStep, setCurrentStep] = useState<'question' | 'divination' | 'result'>('question');
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory | null>(null);
  const [divinationResult, setDivinationResult] = useState<Yao[]>([]);

  const handleQuestionConfirm = (question: string, category: QuestionCategory) => {
    setSelectedQuestion(question);
    setSelectedCategory(category);
    setCurrentStep('divination');
  };

  const handleDivinationComplete = (yaoArray: Yao[]) => {
    setDivinationResult(yaoArray);
    setCurrentStep('result');
    console.log('起卦完成:', yaoArray);
  };

  const handleBackToQuestion = () => {
    setCurrentStep('question');
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
      
      {currentStep === 'result' && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">解卦结果</h2>
            <p className="text-gray-600 mb-4">问题：{selectedQuestion}</p>
            <p className="text-gray-600 mb-4">类别：{selectedCategory?.name}</p>
            <p className="text-gray-600 mb-4">卦象：</p>
            <div className="mb-4">
              {divinationResult.map(yao => (
                <span key={yao.position} className="mr-2 text-lg font-mono">
                  {yao.symbol}
                </span>
              ))}
            </div>
            <p className="text-gray-500">（解卦功能待实现）</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
