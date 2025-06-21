import React from "react";
import Loading from "./Loading.jsx";
import Header from "./Header.jsx";
import { useUsuarios } from "./providers/useUsuarios.jsx";
import { LandingPage } from "./LandingPage.jsx";

function App() {
  const { usuariosLoading } = useUsuarios();
  return usuariosLoading ? (
    <Loading />
  ) : (
    <>
      <Header tipo={"pagina-inicial"} />
      <LandingPage />
    </>
  );
}

export default App;
