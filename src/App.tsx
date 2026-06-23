// src/App.tsx
import { useState } from 'react';
import { QuestionSelector } from './components/QuestionSelector';
import { Divination } from './components/Divination';
import { PaiGua } from './components/PaiGua';
import { JieGua } from './components/JieGua';
import { AIInterpretation } from './components/AIInterpretation';
import type { QuestionCategory } from './types/question';
import type { Yao } from './types/divination';
import type { PaiGuaResult } from './types/paigua';

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

  const handleAiInterpretation = () => {
    setCurrentStep('ai');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="animate-fade-in">
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
            onAiInterpretation={handleAiInterpretation}
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
    </div>
  );
}

export default App;
