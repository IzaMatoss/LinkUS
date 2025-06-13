import { Router } from "express";
import {
  criarUsuario,
  logarUsuario,
  acharUsuariosPorInteresse,
  acharUsuarios,
} from "../controllers/usuarioController.js";

const router = Router();

router.post("/criarUsuario", criarUsuario);
router.post("/logarUsuario", logarUsuario);
router.get("/acharPorInteresse/:email", acharUsuariosPorInteresse);
router.get("/acharUsuarios", acharUsuarios);

export default router;
