import { useNavigate } from "react-router-dom";

export default function Ranking() {
  const navigate = useNavigate();
  return (
    <>
      <section>
        <main>
          <button onClick={() => navigate('/')}>Jogar Novamente</button>
        </main>
      </section>
    </>
  )
}
