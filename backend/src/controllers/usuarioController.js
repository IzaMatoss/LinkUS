import pool from "../db.js";
import bcrypt from "bcrypt";

export async function criarUsuario(req, res) {
  const usuario = req.body;
  if (
    !usuario ||
    !usuario.nome ||
    !usuario.email ||
    !usuario.senha ||
    !usuario.data_nascimento
  )
    return res.status(401).send("informe todos os  campos");
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

    return res.status(201).send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro interno do servidor");
  }
}

export async function acharUsuario(req, res) {
  const email = req.params.email;
  const senha = req.params.senha;
  const acharSQL = "SELECT * from usuario where email = ?";

  try {
    const [result] = await pool.query(acharSQL, [email]);
    if (!result || !result.length)
      return res.status(404).send("Usuário não encontrado");
    if (await bcrypt.compare(senha, result[0].senha))
      return res.status(200).send(result[0]);
    return res.status(401).send("Senha incorreta");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro interno do servidor");
  }
}
