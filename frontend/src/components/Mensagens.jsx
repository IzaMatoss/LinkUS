import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import MensagensUsuario from "./MensagensUsuario.jsx";
import Conversas from "./Conversas.jsx";
import { useAutenticador } from "./providers/useAutenticador.jsx";

function Mensagens() {
  const navigate = useNavigate();
  const { usuario, token } = useAutenticador();
  const [termo, setTermo] = useState(null);
  const [conversa, setConversa] = useState(null);
  if (!usuario || !token) navigate("/entrar");
  console.log(usuario);

  return (
    <article aria-label="Mensagens">
      <Header tipo="logado" setTermo={setTermo} />
      <div>
        <Sidebar ativo={"mensagem"} />
        <MensagensUsuario
          termo={termo}
          conversa={conversa}
          setConversa={setConversa}
        />
        <Conversas conversa={conversa} setConversa={setConversa} />
      </div>
    </article>
  );
}

export default Mensagens;
