import { type ReactNode, useMemo, useState } from 'react';
import Context, { type MyContextProps } from './Context';
import { MD5 } from "crypto-js"
import type { FormFields } from '../Types';

interface MyProviderProps {
  children: ReactNode;
}

function Provider({ children }: MyProviderProps) {
  const [playerData, setPlayerData] = useState<FormFields>({
    name: '',
    email: '',
    score: 0
  })
  const [avatar, setAvatar] = useState('');

  function getPlayerDataFromStorage() {
    const data = localStorage.getItem('playerData')
    if (data) {
      const dataParsed = JSON.parse(data)
      const avatarToHash = MD5(dataParsed.name).toString()
      setAvatar(avatarToHash)
      setPlayerData(dataParsed)
    }
  }

  // Estados e funções a serem compartilhados entre os componentes.
  const value:MyContextProps = useMemo(() => ({
    playerData,
    avatar,
    setAvatar,
    setPlayerData,
    getPlayerDataFromStorage
  }), [playerData, avatar]);
  return (
    <Context.Provider value={ value }>
      {children}
    </Context.Provider>
  );
}

export default Provider;