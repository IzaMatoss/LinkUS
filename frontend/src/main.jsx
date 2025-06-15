import React from "react";
import { createRoot } from "react-dom/client";
import { UsuariosProvider } from "./components/providers/UsuariosProvider.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./components/App.jsx";
import "./css/style.css";
import Entrar from "./components/Entrar.jsx";
import Cadastrar from "./components/Cadastrar.jsx";
import Post from "./components/Post.jsx";
import { AutenticadorProvider } from "./components/providers/AutenticadorProvider.jsx";
import { GruposProvider } from "./components/providers/GruposProvider.jsx";
import { PostagensProvider } from "./components/providers/PostagensProvider.jsx";
import { MensagensProvider } from "./components/providers/MensagensProvider.jsx";

createRoot(document.getElementById("root")).render(
  <AutenticadorProvider>
    <UsuariosProvider>
      <GruposProvider>
        <PostagensProvider>
          <MensagensProvider>
            <Router>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/entrar" element={<Entrar />} />
                <Route path="/cadastro" element={<Cadastrar />} />
                <Route path="/post" element={<Post />} />
              </Routes>
            </Router>
          </MensagensProvider>
        </PostagensProvider>
      </GruposProvider>
    </UsuariosProvider>
  </AutenticadorProvider>
);
