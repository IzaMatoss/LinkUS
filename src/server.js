import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usuariosRoutes from "./routes/usuariosRoutes.js";
import usuariosInteressesRoutes from "./routes/usuariosInteressesRoutes.js";
import conexoesRoutes from "./routes/conexoesRoutes.js";
import gruposRoutes from "./routes/gruposRoutes.js";
import mensagensRoutes from "./routes/mensagensRoutes.js";
import postagensRoutes from "./routes/postagensRoutes.js";
import comentariosRoutes from "./routes/comentariosRoutes.js";
import interacoesRoutes from "./routes/interacoesRoutes.js";
import { verificarToken } from "./middlewareAutenticador.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/usuario", usuariosRoutes);

app.use("/usuarioInteresse", verificarToken, usuariosInteressesRoutes);

app.use("/conexao", conexoesRoutes);

app.use("/grupo", gruposRoutes);

app.use("/mensagem", verificarToken, mensagensRoutes);

app.use("/postagem", postagensRoutes);

app.use("/comentario", comentariosRoutes);

app.use("/interacao", interacoesRoutes);

app.get("/", (req, res) => res.send("Servidor rodando"));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta:  ${PORT}`);
});
