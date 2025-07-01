import React, { useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import { useAutenticador } from "./providers/useAutenticador";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";
import Erro from "./Erro";

function Cadastrar() {
  const { usuario, token } = useAutenticador();
  const [dataNascimento, setDataNascimento] = useState();
  const navigate = useNavigate();
  const [erro, setErro] = useState();

  useEffect(() => {
    if (usuario || token) {
      navigate("/post");
    }
  }, [usuario, token, navigate]);

  if (erro) return <Erro mensagem={erro} setModalErro={setErro} />;

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
              data_nascimento: dataNascimento?.toISOString().split("T")[0],
            };

            try {
              const result = await fetch(
                "https://app-4aeaa295-402a-4d09-80df-d55bc4a98856.cleverapps.io/usuario/criarUsuario",
                {
                  method: "POST",
                  body: JSON.stringify(dados),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              if (result.status !== 201) setErro(await result.text());
              else
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
          <DatePicker
            selected={dataNascimento}
            onChange={(date) => setDataNascimento(date)}
            placeholderText="data de nascimento"
            dateFormat="dd/MM/yyyy"
            className="input-date"
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            maxDate={new Date()}
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
