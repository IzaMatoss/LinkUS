import { Link } from "react-router-dom";
import "../css/header.css";

function Header({ tipo }) {
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
          <Link to={tipo === "entrar" ? "/cadastro" : "/entrar"}>
            <p>{tipo === "entrar" ? "Criar conta" : "Entrar"}</p>
          </Link>
        </div>
      </header>
    );

  return (
    <header>
      <Link to="/">
        <img src="./icons/logo.svg" alt="LinkUS logo" />
      </Link>
      <div id="input-header">
        <input type="text" placeholder="Pesquise algo" />
        <img src="./icons/pesquisa.svg" alt="Ícone de pesquisa" />
      </div>
      <div>
        <Link>
          <img src="./icons/conversa.svg" alt="Ícone de conversas" />
        </Link>
        <Link>
          <img src="./icons/perfil.svg" alt="Ícone de perfil" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
