import { useEffect, useState } from "react"
import { MD5 } from "crypto-js"
import type { FormFields } from "../Types";
import { useNavigate } from "react-router-dom";

export default function Feedback() {
  const [playerData, setPlayerData] = useState<FormFields>({
      name: '',
      email: '',
      score: 0,
      correctQuestions: 0,
    })
    const [avatar, setAvatar] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
      const data = localStorage.getItem('playerData')
        if (data) {
          const dataParsed = JSON.parse(data)
          const avatarToHash = MD5(dataParsed.name).toString()
          setAvatar(avatarToHash)
          setPlayerData(dataParsed)
        }
    }, [])
 
  return (
    <section>
      <div>
        <img
          src={`https://www.gravatar.com/avatar/${avatar}`}
          alt="player-avatar"
          data-testid="header-profile-picture"
        />
        <p data-testid="feedback-total-score">{playerData.score}</p>
        <p
          data-testid="feedback-total-question"
        >
          {`Você acertou ${playerData.correctQuestions} perguntas`}
        </p>
        <h3
          data-testid="feedback-text"
        >
          {playerData.correctQuestions < 3 ? 'Could be better...' : 'Well Done!'}
        </h3>
      </div>
      <div>
        <button
          onClick={() => navigate('/ranking')}
          data-testid="btn-ranking"
          >
          Ranking
        </button>
        <button
          onClick={() => navigate('/')}
          data-testid="btn-play-again"
        >
          Jogar Novamente
        </button>
      </div>
    </section>
  )
}
