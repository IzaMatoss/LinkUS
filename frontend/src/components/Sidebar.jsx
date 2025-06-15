import React from "react";
import { Link } from "react-router-dom";
import { useGrupos } from "./providers/useGrupos";
import "../css/sidebar.css";

function Sidebar({ ativo }) {
  const { gruposUsuario } = useGrupos();

  return (
    <div className="container" id="sidebar">
      <Link className={ativo === "home" ? "active" : ""}>
        <img src="./icons/casa.svg" alt="Ícone da página inicial" />
        <p>Home</p>
      </Link>
      <Link>
        <img src="./icons/mensagem.svg" alt="Ícone da página de mensagens" />
        <p>Mensagens</p>
      </Link>
      <Link>
        <img src="./icons/amigos.svg" alt="Ícone da página de amizades" />
        <p>Amizades</p>
      </Link>
      <Link>
        <img src="./icons/grupos.svg" alt="Ícone da página de grupos" />
        <p>Grupos</p>
      </Link>
      <div>
        <h2>Meus grupos</h2>
        <ul>
          {gruposUsuario.map((grupo, index) =>
            index > 5 ? null : (
              <li key={index}>
                <p>{grupo.nome}</p>
                <p>{grupo.descricao}</p>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
