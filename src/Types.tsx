export type FormFields = {
  name: string;
  email: string;
}

export type QuizResponse = {
  response_code: number;
  results: QuizQuestion[];
};

export type QuizQuestion = {
  type: 'multiple' | 'boolean'; // pode expandir conforme necessário
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type Answer = {
  question: string;
  correct: boolean;
  difficulty: "easy" | "medium" | "hard";
  order: number;
}