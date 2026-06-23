// src/types/question.ts
export interface QuestionCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  examples: string[];
}

export interface QuestionSelectorState {
  selectedCategory: QuestionCategory | null;
  question: string;
  showCustomInput: boolean;
}
