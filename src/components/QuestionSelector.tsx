// src/components/QuestionSelector.tsx
import { useState } from 'react';
import type { QuestionCategory, QuestionSelectorState } from '../types/question';
import { categories } from '../data/categories';
import { CategoryCard } from './CategoryCard';
import { QuestionInput } from './QuestionInput';

interface QuestionSelectorProps {
  onQuestionConfirm: (question: string, category: QuestionCategory) => void;
}

export function QuestionSelector({ onQuestionConfirm }: QuestionSelectorProps) {
  const [state, setState] = useState<QuestionSelectorState>({
    selectedCategory: null,
    question: '',
    showCustomInput: false
  });

  const handleCategoryClick = (category: QuestionCategory) => {
    setState({
      selectedCategory: category,
      question: '',
      showCustomInput: true
    });
  };

  const handleQuestionChange = (question: string) => {
    setState(prev => ({ ...prev, question }));
  };

  const handleConfirm = () => {
    if (state.selectedCategory && state.question.trim()) {
      onQuestionConfirm(state.question, state.selectedCategory);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="container-responsive section">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-800 mb-4 font-serif">
              六爻算命
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto">
              选择您想占卜的问题类别，开始您的六爻之旅
            </p>
          </div>
          
          <div className="grid-responsive mb-8">
            {categories.map((category, index) => (
              <div 
                key={category.id} 
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CategoryCard
                  category={category}
                  isSelected={state.selectedCategory?.id === category.id}
                  onClick={handleCategoryClick}
                />
              </div>
            ))}
          </div>
          
          {state.showCustomInput && state.selectedCategory && (
            <div className="animate-slide-up">
              <QuestionInput
                category={state.selectedCategory}
                question={state.question}
                onQuestionChange={handleQuestionChange}
                onConfirm={handleConfirm}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
