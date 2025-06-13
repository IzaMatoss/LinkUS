import { Router } from "express";
import {
  administrarParticipante,
  criarGrupo,
  participarGrupo,
  acharGrupos,
} from "../controllers/grupoController.js";

const router = Router();

router.post("/criarGrupo", criarGrupo);
router.post("/participarGrupo", participarGrupo);
router.put("/administrarParticipante", administrarParticipante);
router.get("/acharGrupos", acharGrupos);

export default router;
