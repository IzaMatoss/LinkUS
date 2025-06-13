import { Router } from "express";
import {
  administrarParticipante,
  criarGrupo,
  participarGrupo,
  acharGrupos,
} from "../controllers/grupoController.js";
import { verificarToken } from "../middlewareAutenticador.js";

const router = Router();

router.post("/criarGrupo", verificarToken, criarGrupo);
router.post("/participarGrupo", verificarToken, participarGrupo);
router.put("/administrarParticipante", verificarToken, administrarParticipante);
router.get("/acharGrupos", acharGrupos);

export default router;
