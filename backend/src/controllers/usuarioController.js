import pool from "../db.js";
import bcrypt from "bcrypt";

export async function criarUsuario(req, res) {
  const usuario = req.body;
  if (!usuario) return res.status(401).send("informe todos os  campos");
  const criarSQL =
    "INSERT INTO usuario(nome, email, senha, data_nascimento) values(?, ?, ?, ?)";

  const senhaComHash = await bcrypt.hash(usuario.senha, 8);

  try {
    const [result] = await pool.query(criarSQL, [
      usuario.nome,
      usuario.email,
      senhaComHash,
      usuario.data_nascimento,
    ]);

    console.log(result);
    return res.status(201).send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Um erro inesperado ocorreu");
  }
}

export async function acharUsuario(req, res) {
  const email = req.params.email;
  if (!email) return res.status(400).send("O email e a senha são obrigatórios");
  const acharSQL = "SELECT * from usuario where email = ?";

  try {
    const [result] = await pool.query(acharSQL, [email]);
    console.log(result);
    return res.status(200).send(result);
  } catch (error) {
    console.error(error);
  }
}
