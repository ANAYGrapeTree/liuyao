// src/components/QuestionSelector.tsx
import { useState } from 'react';
import { QuestionCategory, QuestionSelectorState } from '../types/question';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">六爻算命</h1>
          <p className="text-lg text-gray-600">
            选择您想占卜的问题类别，开始您的六爻之旅
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {categories.map(category => (
            <CategoryCard
              key={category.id}
              category={category}
              isSelected={state.selectedCategory?.id === category.id}
              onClick={handleCategoryClick}
            />
          ))}
        </div>
        
        {state.showCustomInput && state.selectedCategory && (
          <QuestionInput
            category={state.selectedCategory}
            question={state.question}
            onQuestionChange={handleQuestionChange}
            onConfirm={handleConfirm}
          />
        )}
      </div>
    </div>
  );
}
