import { Router } from "express";
import {
  enviarSolicitacao,
  aceitarSolicitacao,
  recusarSolicitacao,
} from "../controllers/conexaoController.js";
import { verificarToken } from "../middlewareAutenticador.js";

const router = Router();

router.post("/enviarSolicitacao", verificarToken, enviarSolicitacao);
router.put("/aceitarSolicitacao", verificarToken, aceitarSolicitacao);
router.delete("/recusarSolicitacao", verificarToken, recusarSolicitacao);

export default router;
