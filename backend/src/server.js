import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usuariosRoutes from "./routes/usuariosRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/usuario", usuariosRoutes);

app.get("/", (req, res) => res.send("Servidor rodando"));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta:  ${PORT}`);
});
