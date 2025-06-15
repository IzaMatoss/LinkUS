import React from "react";
import { useState } from "react";
import { AutenticadorContext } from "./useAutenticador";
import { jwtDecode } from "jwt-decode";

export function AutenticadorProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [usuario, setUsuario] = useState(null);

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
      return false;
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUsuario(null);
  }

  return (
    <AutenticadorContext.Provider value={{ token, login, logout, usuario }}>
      {children}
    </AutenticadorContext.Provider>
  );
}
