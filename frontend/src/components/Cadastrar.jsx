import React from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import "../css/acessar.css";

function Cadastrar() {
  const navigate = useNavigate();

  return (
    <article aria-label="cadastrar" id="cadastrar">
      <Header tipo="pagina-inicial" />
      <div className="container acessar-div">
        <img
          src="./ilustrations/ilustracao3.png"
          alt="Ilustração de uma pessoa anunciando"
        />
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const data = new FormData(e.target);
            const dados = {
              nome: data.get("nome"),
              email: data.get("email"),
              senha: data.get("senha"),
              data_nascimento: data.get("data"),
            };

            console.log(dados);
            try {
              const result = await fetch(
                "http://localhost:5000/usuario/criarUsuario",
                {
                  method: "POST",
                  body: JSON.stringify(dados),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              if (result.status !== 201)
                return console.log(
                  "Erro ao cadastrar: " + (await result.text())
                );

              navigate("/post", {
                state: { email: data.get("email"), senha: data.get("senha") },
              });
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <h2>Cadastrar</h2>
          <p>Olá! Coloque as informações abaixo para cadastrar sua conta.</p>
          <input
            required
            type="text"
            placeholder="nome de usuário"
            name="nome"
          />
          <input
            required
            type="text"
            placeholder="data de nascimento"
            name="data"
          />
          <input required type="email" placeholder="email" name="email" />
          <input required type="password" placeholder="senha" name="senha" />
          <Link to="/entrar">
            <p>Já possui uma conta?</p>
          </Link>
          <button required type="submit">
            Cadastrar
          </button>
        </form>
        <img
          src="./ilustrations/ilustracao4.png"
          alt="Ilustração de um notebook"
        />
      </div>
    </article>
  );
}

export default Cadastrar;
