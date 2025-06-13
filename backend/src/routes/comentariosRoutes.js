import { Router } from "express";
import {
  criarComentarioPostagem,
  acharComentarios,
} from "../controllers/comentarioController.js";

const router = Router();

router.post("/criarComentarioPostagem", criarComentarioPostagem);
router.get("/acharComentarios/:id_postagem", acharComentarios);

export default router;
