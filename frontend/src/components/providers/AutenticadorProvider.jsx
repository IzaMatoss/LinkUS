import React from "react";
import { useState, useEffect } from "react";
import { AutenticadorContext } from "./useAutenticador";
import { jwtDecode } from "jwt-decode";

export function AutenticadorProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [usuario, setUsuario] = useState(null);
  const [usuarioTrigger, setUsuarioTrigger] = useState(false);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp > Date.now() / 1000) setUsuario(decoded);
        else logout();
      } catch (e) {
        console.error("Token inválido:", e);
        logout();
      }
    }
  }, [token, usuarioTrigger]);

  async function login(email, senha) {
    const result = await fetch("http://localhost:5000/usuario/logarUsuario", {
      method: "POST",
      body: JSON.stringify({ email, senha }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result.ok) {
      const data = await result.json();
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUsuario(jwtDecode(data.token));
      return true;
    } else {
      console.error("Erro ao logar o usuário: " + (await result.text()));
      return false;
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUsuario(null);
  }

  return (
    <AutenticadorContext.Provider
      value={{ token, login, logout, usuario, setUsuarioTrigger }}
    >
      {children}
    </AutenticadorContext.Provider>
  );
}
