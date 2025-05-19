import { useCallback, useEffect, useState } from "react"
import type { Answer, QuizQuestion } from "../Types"
import { useNavigate } from "react-router-dom"

export default function Play() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [answers, setAnswers] = useState<Answer[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [enableNext, setEnableNext] = useState(false)

  const navigate = useNavigate();

  // 1. Buscar perguntas
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=10')
        const data = await response.json()
        setQuestions(data.results)
      } catch (error) {
        console.error("Erro ao buscar perguntas:", error)
      }
    }

    fetchQuestions()
  }, [])

  // 2. Embaralhar respostas sempre que mudar a pergunta
  useEffect(() => {
    if (questions.length === 0 || !questions[currentIndex]) return;

    const question = questions[currentIndex]

    const scrambled: Answer[] = [
      {
        question: question.correct_answer,
        correct: true,
        difficulty: question.difficulty,
        order: Math.random(),
      },
      ...question.incorrect_answers.map((ans) => ({
        question: ans,
        correct: false,
        difficulty: question.difficulty,
        order: Math.random(),
      })),
    ]

    setAnswers(scrambled)
    setEnableNext(false)
  }, [questions, currentIndex])

  // 3. Ir para a próxima pergunta
  const handleNext = useCallback(() => {
    const isLastQuestion = currentIndex >= questions.length - 1
    if (isLastQuestion) {
      navigate("/feedback")
    } else {
      setCurrentIndex((prev) => prev + 1)
    }
  }, [currentIndex, questions.length, navigate])

  return (
    <section>
      <div>
        <h2 data-testid="question-category">
          {questions[currentIndex]?.category}
        </h2>
        <p data-testid="question-text">
          {questions[currentIndex]?.question.replace('&quot;', '"')}
        </p>

        <section data-testid="answer-options">
          {answers
            .sort((a, b) => a.order - b.order)
            .map((ans, index) => (
              <button
                key={index}
                onClick={() => setEnableNext(true)} // Apenas exemplo: você pode querer validar se a resposta está correta aqui
                data-testid={ans.correct ? "correct-answer" : `wrong-answer-${index}`}
              >
                {ans.question}
              </button>
            ))}
        </section>

        {enableNext && (
          <button data-testid="btn-next" onClick={handleNext}>
            Next
          </button>
        )}
      </div>
    </section>
  )
}
