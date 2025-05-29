import { type Dispatch, type SetStateAction, createContext } from 'react';
import type { FormFields } from '../Types';

type PlayerDataState = FormFields
type AvatarState = string

export interface MyContextProps {
  playerData: FormFields
  avatar: string
  setPlayerData: Dispatch<SetStateAction<PlayerDataState>>
  setAvatar: Dispatch<SetStateAction<AvatarState>>
  getPlayerDataFromStorage:() => void
}

const Context = createContext<MyContextProps | undefined>(undefined);

export default Context;