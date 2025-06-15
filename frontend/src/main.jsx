import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./components/App.jsx";
import { UsuariosProvider } from "./components/providers/UsuariosProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UsuariosProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  </UsuariosProvider>
);
