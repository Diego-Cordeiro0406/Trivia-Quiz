import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FormFields } from "../Types";

export default function LoginForm() {
  const [formData, setFormData] = useState<FormFields>({
    name: '',
    email: '',
    score: 0,
    correctQuestions: 0
   });

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
       ...prevFormData,
       [name]: value,
    }));
   };

   const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      localStorage.setItem('playerData', JSON.stringify(formData))
      const fetchToken = await fetch('https://tryvia.ptr.red/api_token.php?command=request')
      const tokenResponse = await fetchToken.json()
      localStorage.setItem('token', JSON.stringify({token: tokenResponse.token}))
      navigate('/play')
    } catch (error) {
      console.log(error);
    }
  };

  const validate = formData.name.length > 2 && formData
    .email.includes('@') && formData.email.endsWith('.com')

  return (
    <form onSubmit={ handleSubmit }>
      <div>
        <input
          data-testid="input-player-name"
          name="name"
          id="input-name"
          type="text"
          placeholder="nome"
          value={ formData.name }
          onChange={ handleInputChange }
        />
        <input
          data-testid="input-gravatar-email"
          name="email"
          id="input-email"
          type="text"
          placeholder="email"
          value={ formData.email }
          onChange={ handleInputChange }
        />
      </div>
      <button
        type="submit"
        data-testid="btn-play"
        disabled={!validate}
      >
        jogar
      </button>
      <button
        type="button"
        data-testid="btn-settings"
        onClick={ () => navigate('/settings') }
      >
        configurações
      </button>
    </form>
  )
}
