import { Router } from "express";
import {
  criarInteracao,
  contarInteracoes,
} from "../controllers/interacaoController.js";
import { verificarToken } from "../middlewareAutenticador.js";

const router = Router();

router.post("/criarInteracao", verificarToken, criarInteracao);
router.get("/contarInteracoes/:id", contarInteracoes);

export default router;
