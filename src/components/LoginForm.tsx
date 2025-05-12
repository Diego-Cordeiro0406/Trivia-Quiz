import { useState } from "react";

export default function LoginForm() {
  const [playerData, setplayerData] = useState<string>('');

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const novoValor = e.target.value;
    setplayerData(novoValor)
   };

  const handleClick = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=10');
      const jsonData = await response.json();
      console.log(jsonData)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form>
      <div>
        <input
          data-testid="input-player-name"
          name="name"
          id="input-name"
          type="text"
          placeholder="nome"
          value={ playerData }
          onChange={ handleInputChange }
        />
      </div>
      {/* <button onClick={ handleClick }>jogar</button> */}
    </form>
  )
}
