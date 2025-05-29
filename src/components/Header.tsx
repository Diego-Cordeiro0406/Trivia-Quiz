import { useContext, useEffect, } from "react"
import Context from "../context/Context";

export default function Header() {
const context = useContext(Context);

  useEffect(() => {
    if (context) {
      context.getPlayerDataFromStorage()
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!context) return null;
  const {
    playerData,
    avatar,
  } = context;

  return (
    <section>
      <div>
        <img
          data-testid="header-profile-picture"
          src={`https://www.gravatar.com/avatar/${avatar}`}
          alt="player-avatar"
        />
        <p data-testid="header-player-name">{playerData.name}</p>
        <p data-testid="header-score">{`placar: ${playerData.score}`}</p>
      </div>
    </section>
  )
}
