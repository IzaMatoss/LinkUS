import { Router } from "express";
import {
  criarUsuario,
  acharUsuario,
} from "../controllers/usuarioController.js";

const router = Router();

router.post("/", criarUsuario);
router.get("/:email/:senha", acharUsuario);

export default router;
