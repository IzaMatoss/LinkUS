import React from "react";
import { useMensagens } from "./providers/useMensagens";
import "../css/conversasRecentes.css";

function ConversasRecentes() {
  const { mensagensUsuario } = useMensagens();

  return (
    <article aria-labelledby="conversas" id="conversas">
      <h2>Conversas recentes</h2>
      <ul>
        {mensagensUsuario &&
          mensagensUsuario.map((mensagem) => (
            <li>
              <img
                src={
                  mensagem.url_foto ? mensagem.url_foto : "./icons/padrao.svg"
                }
                alt="Foto de perfil"
              />
              <p>{mensagem.nome}</p>
            </li>
          ))}
      </ul>
    </article>
  );
}

export default ConversasRecentes;
