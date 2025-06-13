import { Router } from "express";
import {
  criarInteracao,
  contarInteracoes,
} from "../controllers/interacaoController.js";

const router = Router();

router.post("/criarInteracao", criarInteracao);
router.get("/contarInteracoes/:id", contarInteracoes);

export default router;
