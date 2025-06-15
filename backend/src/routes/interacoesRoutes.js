import { Router } from "express";
import {
  criarInteracao,
  temInteracaoPost,
  temInteracaoComentario,
} from "../controllers/interacaoController.js";
import { verificarToken } from "../middlewareAutenticador.js";

const router = Router();

router.post("/criarInteracao", verificarToken, criarInteracao);
router.post("/temInteracaoPost", verificarToken, temInteracaoPost);
router.post("/temInteracaoComentario", verificarToken, temInteracaoComentario);

export default router;
