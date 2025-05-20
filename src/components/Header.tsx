import { useEffect, useState } from "react"
import type { FormFields } from "../Types"
import { MD5 } from "crypto-js"

export default function Header() {
  const [playerData, setPlayerData] = useState<FormFields>({
    name: '',
    email: '',
    score: 0
  })
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('playerData')
    if (data) {
      const dataParsed = JSON.parse(data)
      const avatarToHash = MD5(dataParsed.name).toString()
      setAvatar(avatarToHash)
      setPlayerData(dataParsed)
    }
    
  }, [])


  // useEffect(() => {
  //   const storageData = localStorage.getItem('playerData');
  //   if (storageData) {
  //     setPlayerData(JSON.parse(storageData));
  //   }
  // }, []);

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
