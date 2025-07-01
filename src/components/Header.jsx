import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAutenticador } from "./providers/useAutenticador.jsx";

function Header({ tipo, setTermo }) {
  const navigate = useNavigate();
  const { usuario, logout } = useAutenticador();
  const [menuAberto, setMenuAberto] = useState(false);

  if (tipo === "pagina-inicial" || tipo === "cadastro")
    return (
      <header>
        <Link to="/">
          <img src="./icons/logo.svg" alt="LinkUS logo" />
        </Link>
        <div>
          <Link to="/">
            <p>Contato</p>
          </Link>
          <Link to={tipo !== "pagina-inicial" ? "/cadastro" : "/entrar"}>
            <p>{tipo !== "pagina-inicial" ? "Cadastrar" : "Entrar"}</p>
          </Link>
        </div>
      </header>
    );

  if (!usuario) return null;

  return (
    <header>
      <Link to="/post">
        <img src="./icons/logo.svg" alt="LinkUS logo" />
      </Link>
      <div id="input-header">
        <input
          type="text"
          placeholder="use # para interesses @ para pessoas"
          id="search"
          onChange={(e) => setTermo(e.target.value)}
        />
        <img src="./icons/pesquisa.svg" alt="Ícone de pesquisa" />
      </div>
      <div>
        <Link to="/mensagem">
          <img src="./icons/conversa.svg" alt="Ícone de conversas" />
        </Link>
        <Link to="/perfil">
          <img
            id="foto-perfil"
            src={usuario.url_foto || "./icons/perfil.svg"}
            alt="Ícone de perfil"
          />
        </Link>
        <img
          src="./icons/logout.svg"
          alt="Ícone para sair da sua conta"
          onClick={() => {
            navigate("/");
            logout();
          }}
        />
        <img
          src="./icons/menu-hamburguer.svg"
          alt="Menu de opções"
          onClick={() => setMenuAberto(true)}
        />
      </div>
      {menuAberto && (
        <div id="menu">
          <img
            src="./icons/fechar.svg"
            alt="Ícone para fechar o menu"
            onClick={() => setMenuAberto(false)}
          />
          <Link to="/post">
            <img src="./icons/casa.svg" alt="Ícone da página inicial" />
            <p>Home</p>
          </Link>
          <Link to="/mensagem">
            <img
              src="./icons/mensagem.svg"
              alt="Ícone da página de mensagens"
            />
            <p>Mensagens</p>
          </Link>
          <Link to="/amigo">
            <img src="./icons/amigos.svg" alt="Ícone da página de amizades" />
            <p>Amizades</p>
          </Link>
          <Link to="/perfil">
            <img
              src="./icons/padrao-escuro.svg"
              alt="Ícone da página de perfil"
            />
            <p>Perfil</p>
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
