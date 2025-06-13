import { Router } from "express";
import {
  criarPostagem,
  acharPostagens,
} from "../controllers/postagemController.js";

const router = Router();

router.post("/criarPostagem", criarPostagem);
router.get("/acharPostagens", acharPostagens);

export default router;
