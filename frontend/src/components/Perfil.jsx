import React, { useState } from "react";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import PostagensUsuario from "./PostagensUsuario.jsx";
import ConversasRecentes from "./ConversasRecentes.jsx";

function Perfil() {
  const [termo, setTermo] = useState(null);

  return (
    <article aria-label="Perfil">
      <Header tipo="logado" setTermo={setTermo} />
      <div>
        <Sidebar />
        <PostagensUsuario termo={termo} />
        <ConversasRecentes />
      </div>
    </article>
  );
}

export default Perfil;
