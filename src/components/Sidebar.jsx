import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGrupos } from "./providers/useGrupos";

function Sidebar({ ativo }) {
  const navigate = useNavigate();
  const { gruposUsuario } = useGrupos();

  return (
    <div className="container" id="sidebar">
      <Link className={ativo === "home" ? "active" : ""} to="/post">
        <img src="./icons/casa.svg" alt="Ícone da página inicial" />
        <p>Home</p>
      </Link>
      <Link className={ativo === "mensagem" ? "active" : ""} to="/mensagem">
        <img src="./icons/mensagem.svg" alt="Ícone da página de mensagens" />
        <p>Mensagens</p>
      </Link>
      <Link className={ativo === "amigos" ? "active" : ""} to="/amigo">
        <img src="./icons/amigos.svg" alt="Ícone da página de amizades" />
        <p>Amizades</p>
      </Link>
      <Link className={ativo === "perfil" ? "active" : ""} to="/perfil">
        <img src="./icons/padrao-escuro.svg" alt="Ícone da página de perfil" />
        <p>Perfil</p>
      </Link>
      <div>
        <h2>Meus grupos</h2>
        <ul>
          {gruposUsuario &&
            gruposUsuario.map((grupo, index) =>
              index > 2 ? null : (
                <li
                  key={index}
                  onClick={() => {
                    navigate("/mensagem", { state: grupo });
                  }}
                >
                  <img
                    id="foto-perfil"
                    src={gruposUsuario.url_foto ?? "./icons/padrao.svg"}
                    alt="Imagem do grupo"
                  />
                  <div>
                    <p>
                      {grupo.nome?.length > 12
                        ? grupo.nome.substring(0, 12) + "..."
                        : grupo.nome}
                    </p>
                    <p>
                      {grupo.descricao?.length > 20
                        ? grupo.descricao.substring(0, 20) + "..."
                        : grupo.descricao}
                    </p>
                  </div>
                </li>
              )
            )}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
