import pool from "../db.js";

export async function criarPostagem(req, res) {
  const post = req.body;
  const acharUsuarioPorNomeSQL =
    "SELECt id_usuario from usuario where nome = ?";
  const criarPostagemSQL =
    "INSERT INTO postagem(tipo_conteudo, texto, url_midia, fk_autor) values (?, ?, ?, ?)";

  try {
    const [resultAcharUsuarioPorNome] = await pool.query(
      acharUsuarioPorNomeSQL,
      [post.nomeAutor]
    );

    if (!resultAcharUsuarioPorNome[0])
      return res.status(404).send("Autor da postagem não encontrado");

    const [resultCriarPostagem] = await pool.query(criarPostagemSQL, [
      post.tipo,
      post.texto,
      post.url_midia,
      resultAcharUsuarioPorNome[0].id_usuario,
    ]);

    if (!resultCriarPostagem)
      return res.status(400).send("Erro ao tentar criar postagem");

    return res.status(201).send("Postagem feita com sucesso");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro interno do servidor");
  }
}

export async function acharPostagens(req, res) {
  const acharPostagensSQL =
    "SELECT id_postagem, data_criacao, tipo_conteudo, texto, url_midia, nome, url_foto from postagem p join usuario u on u.id_usuario = p.fk_autor";

  try {
    const [resultAcharPostagens] = await pool.query(acharPostagensSQL);

    if (!resultAcharPostagens)
      return res.status(401).send("Erro ao tentar achar as postagens");

    return res.status(200).send(resultAcharPostagens);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro interno do servidor");
  }
}
