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
