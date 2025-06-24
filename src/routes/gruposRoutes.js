import { Router } from "express";
import {
  administrarParticipante,
  criarGrupo,
  participarGrupo,
  acharGrupos,
  acharGruposPorUsuario,
  acharUsuariosPorGrupo,
  sairGrupo,
} from "../controllers/grupoController.js";
import { verificarToken } from "../middlewareAutenticador.js";

const router = Router();

router.post("/criarGrupo", verificarToken, criarGrupo);
router.post("/participarGrupo", verificarToken, participarGrupo);
router.put("/administrarParticipante", verificarToken, administrarParticipante);
router.get("/acharGrupos", acharGrupos);
router.get("/acharGrupos/:nome", acharGruposPorUsuario);
router.get("/acharUsuarios/:id_grupo", acharUsuariosPorGrupo);
router.delete("/sairGrupo", verificarToken, sairGrupo);

export default router;
