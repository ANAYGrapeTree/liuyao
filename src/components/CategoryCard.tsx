// src/components/CategoryCard.tsx
import { QuestionCategory } from '../types/question';

interface CategoryCardProps {
  category: QuestionCategory;
  isSelected: boolean;
  onClick: (category: QuestionCategory) => void;
}

export function CategoryCard({ category, isSelected, onClick }: CategoryCardProps) {
  return (
    <div
      onClick={() => onClick(category)}
      className={`
        p-6 rounded-xl cursor-pointer transition-all duration-200
        ${isSelected
          ? 'bg-blue-500 text-white shadow-lg scale-105'
          : 'bg-white hover:bg-gray-50 shadow-md hover:shadow-lg'
        }
      `}
    >
      <div className="text-4xl mb-3">{category.icon}</div>
      <h3 className={`text-xl font-semibold mb-2 ${isSelected ? 'text-white' : 'text-gray-800'}`}>
        {category.name}
      </h3>
      <p className={`text-sm ${isSelected ? 'text-blue-100' : 'text-gray-600'}`}>
        {category.description}
      </p>
    </div>
  );
}
