import { useCallback, useEffect, useState } from "react"
import type { Answer, QuizQuestion } from "../Types"
import { useNavigate } from "react-router-dom"

export default function Play() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [answers, setAnswers] = useState<Answer[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [enableNext, setEnableNext] = useState(false)
  const [timer, setTimer] = useState<number>(30)
  const [isTimerActive, setIsTimerActive] = useState(true);

  const navigate = useNavigate();

  // 1. Buscar perguntas
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          const parsedToken = JSON.parse(token)
          const response = await fetch(
          `https://tryvia.ptr.red/api.php?amount=10&token=${parsedToken.token}`
        )
          const data = await response.json()
          setQuestions(data.results)
        }
        
      } catch (error) {
        console.error("Erro ao buscar perguntas:", error)
      }
    }

    fetchQuestions()
  }, [])

  useEffect(() => {
    let interval: number;
  
    if (isTimerActive && timer > 0) {
      interval = window.setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
  
    if (timer === 0) {
      setIsTimerActive(false);
      setEnableNext(true); // mostra o botão "Next"
    }
  
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  useEffect(() => {
    setTimer(30);
    setIsTimerActive(true);
  }, [currentIndex]);

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
      localStorage.removeItem('token')
      navigate("/feedback")
    } else {
      setCurrentIndex((prev) => prev + 1)
    }
  }, [currentIndex, questions.length, navigate])

  function handleClassName(ans: Answer) {
    if (!enableNext) {
      return 'default';
    }
    return ans.correct ? 'correct-answer' : 'wrong-answer';
  };

  // function handleQuestion(answer: Answer, timer: number) {
  //   const playerData = localStorage.getItem('playerData')
  //   if (playerData) {
  //     let score = 0;
  //     const defaultScore = 10;
  //     const difficulty = {
  //       hard: 3,
  //       medium: 2,
  //       easy: 1,
  //     };

  //     if (answer.correct) {
  //       score = defaultScore + (Number(timer) * Number(difficulty[answer.difficulty]));
  //       const parsedPlayerData = JSON.parse(playerData)
  //       console.log(parsedPlayerData)
  //       const updatedPlayerData = {
  //         ...parsedPlayerData,
  //         score: parsedPlayerData.score + score
  //       }
  //       console.log(updatedPlayerData)
  //       localStorage.setItem('playerData', JSON.stringify(updatedPlayerData))
  //     }
  //   }
  // };


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
                onClick={() => {
                  setEnableNext(true)
                  setIsTimerActive(false)
                  // handleQuestion(ans, timer)
                } } // Habilita o botão para ir para a próxima pergunta
                data-testid={ans.correct ? "correct-answer" : `wrong-answer-${index}`}
                className={ handleClassName(ans) }
              >
                {ans.question}
              </button>
            ))}
        </section>
        <p>{timer}</p>
        {enableNext && (
          <button data-testid="btn-next" onClick={handleNext}>
            Next
          </button>
        )}
      </div>
    </section>
  )
}
