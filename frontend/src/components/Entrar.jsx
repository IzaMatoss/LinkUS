import React from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import "../css/acessar.css";

function Entrar() {
  const navigate = useNavigate();

  return (
    <article aria-label="entrar" id="entrar">
      <Header tipo="cadastro" />
      <div className="container acessar-div">
        <img
          src="./ilustrations/ilustracao1.png"
          alt="Ilustração de uma pessoa estudando"
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.target);
            navigate("/post", {
              state: { email: data.get("email"), senha: data.get("senha") },
            });
          }}
        >
          <h2>Entrar</h2>
          <p>
            Olá novamente! Coloque as informações abaixo para entrar em sua
            conta.
          </p>
          <input type="text" placeholder="email" name="email" />
          <input type="text" placeholder="senha" name="senha" />
          <Link to="/cadastro">
            <p>Não possui uma conta?</p>
          </Link>
          <button type="submit">Entrar</button>
        </form>
        <img
          src="./ilustrations/ilustracao2.png"
          alt="Ilustração de uma carta"
        />
      </div>
    </article>
  );
}

export default Entrar;
