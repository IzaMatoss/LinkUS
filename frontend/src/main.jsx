import { createRoot } from "react-dom/client";
import { UsuariosProvider } from "./components/providers/UsuariosProvider.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./components/App.jsx";
import "./css/style.css";

createRoot(document.getElementById("root")).render(
  <UsuariosProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  </UsuariosProvider>
);
