// src/components/CategoryCard.tsx
import type { QuestionCategory } from '../types/question';

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
        card card-hover cursor-pointer
        ${isSelected
          ? 'bg-primary-500 text-white shadow-medium scale-105 border-2 border-primary-400'
          : 'bg-white hover:bg-neutral-50 border-2 border-transparent'
        }
      `}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(category);
        }
      }}
      aria-pressed={isSelected}
    >
      <div className="text-4xl sm:text-5xl mb-3 transition-transform duration-200 group-hover:scale-110">
        {category.icon}
      </div>
      <h3 className={`text-xl font-semibold mb-2 font-serif ${isSelected ? 'text-white' : 'text-neutral-800'}`}>
        {category.name}
      </h3>
      <p className={`text-sm ${isSelected ? 'text-primary-100' : 'text-neutral-600'}`}>
        {category.description}
      </p>
    </div>
  );
}