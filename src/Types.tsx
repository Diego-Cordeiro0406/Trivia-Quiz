export type FormFields = {
  name: string;
  email: string;
  score: number;
}

export type QuizTokenResponse = {
  response_code: number;
  response_message: string;
  token: string;
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