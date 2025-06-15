import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAutenticador } from "./providers/useAutenticador";
import { useGrupos } from "./providers/useGrupos";
import { usePostagens } from "./providers/usePostagens";
import { useMensagens } from "./providers/useMensagens";
import Loading from "./Loading";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Postagens from "./Postagens";
import ConversasRecentes from "./ConversasRecentes";
import "../css/post.css";

function Post() {
  const navigate = useNavigate();
  const dados = useLocation().state;
  const { gruposUsuarioLoading, acharGruposPorUsuario } = useGrupos();
  const { postagensLoading } = usePostagens();
  const { mensagensUsuarioLoading, acharMensagensPorUsuario } = useMensagens();
  const { login, usuario } = useAutenticador();
  const [termo, setTermo] = useState(null);

  useEffect(() => {
    async function logar() {
      if (!usuario)
        try {
          if (!(await login(dados.email, dados.senha))) navigate("/");
        } catch {
          navigate("/");
        }
    }

    logar();
  }, [login, dados, navigate]);

  useEffect(() => {
    if (usuario) {
      acharGruposPorUsuario(usuario.nome);
      acharMensagensPorUsuario(usuario.email);
    }
  }, [usuario]);

  if (
    gruposUsuarioLoading ||
    postagensLoading ||
    mensagensUsuarioLoading ||
    !usuario
  )
    return <Loading />;

  return (
    <article aria-label="postagens">
      <Header tipo="logado" setTermo={setTermo} />
      <div>
        <Sidebar ativo="home" />
        <Postagens termo={termo} />
        <ConversasRecentes />
      </div>
    </article>
  );
}

export default Post;
