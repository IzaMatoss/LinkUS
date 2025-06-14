import Loading from "./Loading.jsx";
import Header from "./Header.jsx";
import { useUsuarios } from "./providers/useUsuarios";

function App() {
  const { usuarios, usuariosLoading, usuariosTrigger, setUsuariosTrigger } =
    useUsuarios();
  return usuariosLoading ? <Loading /> : <Header tipo={"pagina-inicial"} />;
}

export default App;
