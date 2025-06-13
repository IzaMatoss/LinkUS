import { Router } from "express";
import {
  criarPostagem,
  acharPostagens,
} from "../controllers/postagemController.js";
import { verificarToken } from "../middlewareAutenticador.js";

const router = Router();

router.post("/criarPostagem", verificarToken, criarPostagem);
router.get("/acharPostagens", acharPostagens);

export default router;
