import { Router } from "express";
import {
  enviarSolicitacao,
  aceitarSolicitacao,
  recusarSolicitacao,
} from "../controllers/conexaoController.js";

const router = Router();

router.post("/enviarSolicitacao", enviarSolicitacao);
router.put("/aceitarSolicitacao", aceitarSolicitacao);
router.delete("/recusarSolicitacao", recusarSolicitacao);

export default router;
