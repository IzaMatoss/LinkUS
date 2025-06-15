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
      interacao.id_comentario,
    ]);

    if (!resultCriarInteracao)
      return res.status(400).send("Erro ao tentar interagir na postagem");

    return res.status(200).send("Interação adicionada a postagem com sucesso");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro interno do servidor");
  }
}

export async function temInteracaoPost(req, res) {
  const { email, id_postagem } = req.body;
  const temInteracaoSQL =
    "SELECT i.tipo from interacao i join usuario u on u.id_usuario = i.fk_usuario where u.email = ? and i.fk_postagem = ?";

  try {
    const [resultTemInteracao] = await pool.query(temInteracaoSQL, [
      email,
      id_postagem,
    ]);
    if (!resultTemInteracao)
      return res
        .status(400)
        .send("Erro ao tentar verificar ses o usuário interagiu na postagem");
    if (!resultTemInteracao[0])
      return res.status(202).send("Usuário não interagiu na postagem");

    return res.status(200).send({ tipo: resultTemInteracao[0].tipo });
  } catch (error) {
    console.error(error);
  }
}

export async function temInteracaoComentario(req, res) {
  const { email, id_comentario } = req.body;
  const temInteracaoSQL =
    "SELECT i.tipo from interacao i join usuario u on u.id_usuario = i.fk_usuario join comentario c on c.id_comentario = i.fk_comentario where u.email = ? and c.id_comentario = ?";

  try {
    const [result] = await pool.query(temInteracaoSQL, [email, id_comentario]);

    if (!result || result.length === 0)
      return res.status(202).send("Usuário não interagiu no comentário");

    return res.status(200).send({ tipo: result[0].tipo });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro ao verificar interação no comentário");
  }
}
