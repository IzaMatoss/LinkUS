import React, { useState } from "react";
import { ConexaoContext } from "./useConexao";
import { useAutenticador } from "./useAutenticador";

export function ConexoesProvider({ children }) {
  const { token } = useAutenticador();
  const [conexoesUsuarioLoading, setConexoesUsuarioLoading] = useState(true);
  const [conexoesUsuario, setConexoesUsuario] = useState(null);

  async function acharConexoesPorUsuario(nome) {
    setConexoesUsuarioLoading(true);
    try {
      const result = await fetch(
        `https://app-4aeaa295-402a-4d09-80df-d55bc4a98856.cleverapps.io/conexao/acharConexoes/${nome}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (result.status !== 200)
        console.log("Erro de requisição: " + (await result.text()));
      else setConexoesUsuario(await result.json());
    } catch (error) {
      console.error("Erro de requisição" + error);
    } finally {
      setConexoesUsuarioLoading(false);
    }
  }

  return (
    <ConexaoContext.Provider
      value={{
        conexoesUsuario,
        conexoesUsuarioLoading,
        acharConexoesPorUsuario,
      }}
    >
      {children}
    </ConexaoContext.Provider>
  );
}
