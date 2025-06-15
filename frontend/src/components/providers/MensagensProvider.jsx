import React, { useState } from "react";
import { MensagensContext } from "./useMensagens";
import { useAutenticador } from "./useAutenticador";

export function MensagensProvider({ children }) {
  const { token } = useAutenticador();
  const [mensagensLoading, setMensagensLoading] = useState(true);
  const [mensagensUsuarioLoading, setMensagensUsuarioLoading] = useState(true);
  const [mensagensUsuario, setMensagensUsuario] = useState(null);

  async function acharMensagensPorUsuario(email) {
    setMensagensUsuarioLoading(true);
    try {
      const result = await fetch(
        `http://localhost:5000/mensagem/listarConversasUsuario/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (result.status !== 200)
        console.log("Erro de requisição: " + (await result.text()));
      else setMensagensUsuario(await result.json());
    } catch (error) {
      console.error("Erro de requisição" + error);
    } finally {
      setMensagensUsuarioLoading(false);
    }
  }

  return (
    <MensagensContext.Provider
      value={{
        mensagensLoading,
        setMensagensLoading,
        mensagensUsuario,
        mensagensUsuarioLoading,
        acharMensagensPorUsuario,
      }}
    >
      {children}
    </MensagensContext.Provider>
  );
}
