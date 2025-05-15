import { useEffect, useState } from "react"
import type { FormFields } from "../Types"
import { MD5 } from "crypto-js"

export default function Header() {
  const [playerData, setPlayerData] = useState<FormFields>({
    name: '',
    email: ''
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
  return (
    <section>
      <div>
        <img
          data-testid="header-profile-picture"
          src={`https://www.gravatar.com/avatar/${avatar}`}
          alt="player-avatar"
        />
        <p data-testid="header-player-name">{playerData.name}</p>
        <p data-testid="header-score">placar: 0</p>
      </div>
    </section>
  )
}
