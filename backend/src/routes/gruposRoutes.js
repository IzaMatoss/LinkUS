import { Router } from "express";
import {
  administrarParticipante,
  criarGrupo,
  participarGrupo,
  acharGrupos,
  acharGruposPorUsuario,
} from "../controllers/grupoController.js";
import { verificarToken } from "../middlewareAutenticador.js";

const router = Router();

router.post("/criarGrupo", verificarToken, criarGrupo);
router.post("/participarGrupo", verificarToken, participarGrupo);
router.put("/administrarParticipante", verificarToken, administrarParticipante);
router.get("/acharGrupos", acharGrupos);
router.get("/acharGrupos/:nome", acharGruposPorUsuario);

export default router;
