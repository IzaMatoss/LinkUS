import pool from "../db.js";

export async function criarInteracao(req, res) {
  const interacao = req.body;
  const acharUsuarioPorNomeSQL =
    "SELECT id_usuario from usuario where nome = ?";
  const acharPostagemPorIdSQL =
    "SELECT id_postagem from postagem where id_postagem = ?";
  const acharComentarioPorIdSQL =
    "SELECT id_comentario from comentario where id_comentario = ?";
  const criarInteracaoSQL =
    "INSERT INTO interacao(tipo, fk_usuario, fk_postagem, fk_comentario) values(?, ?, ?, ?)";

  try {
    const [resultAcharUsuarioPorNome] = await pool.query(
      acharUsuarioPorNomeSQL,
      [interacao.nomeAutor]
    );

    if (!resultAcharUsuarioPorNome[0])
      return res.status(404).send("Postagem não encontrada");

    const [resultAcharPostagemPorId] = await pool.query(acharPostagemPorIdSQL, [
      interacao.id_postagem,
    ]);

    if (!resultAcharPostagemPorId[0])
      return res.status(404).send("Postagem não encontrada");

    let resultAcharComentarioPorId;
    if (interacao.id_comentario) {
      [resultAcharComentarioPorId] = await pool.query(acharComentarioPorIdSQL, [
        interacao.id_comentario,
      ]);
      if (!resultAcharComentarioPorId[0])
        return res.status(404).send("Comentário pai não encontrado");
    }

    const [resultCriarInteracao] = await pool.query(criarInteracaoSQL, [
      interacao.tipo,
      resultAcharUsuarioPorNome[0].id_usuario,
      interacao.id_postagem,
      interacao.id_interacao,
    ]);

    if (!resultCriarInteracao)
      return res.status(400).send("Erro ao tentar interagir na postagem");

    return res.status(200).send("Interação adicionada a postagem com sucesso");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro interno do servidor");
  }
}

export async function contarInteracoes(req, res) {
  const contarInteracoesSQL =
    "SELECT COUNT(*) as interacoes from interacao where fk_postagem = ? or fk_comentario = ?";

  try {
    const [resultContarInteracoes] = await pool.query(contarInteracoesSQL, [
      req.params.id,
      req.params.id,
    ]);

    if (!resultContarInteracoes[0])
      return res.status(400).send("Erro ao tentar contar as interações");

    return res.status(200).send(resultContarInteracoes[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro interno do servidor");
  }
}
