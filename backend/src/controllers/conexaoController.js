import pool from "../db.js";

export async function enviarSolicitacao(req, res) {
  const { remetente, destinatario } = req.body;

  const enviarSolicitacaoSQL =
    "INSERT INTO conexao(usuario_1, usuario_2) values (?, ?)";
  const acharIdUsuarioPorNomeSQL =
    "SELECT id_usuario from usuario where nome = ?";

  try {
    const [resultAcharRemetente] = await pool.query(acharIdUsuarioPorNomeSQL, [
      remetente,
    ]);
    if (!resultAcharRemetente[0])
      return res.status(404).send("Remetente não encontrado");

    const [resultAcharDestinatario] = await pool.query(
      acharIdUsuarioPorNomeSQL,
      [destinatario]
    );
    if (!resultAcharDestinatario[0])
      return res.status(404).send("Destinatário não encontrado");

    console.log(resultAcharRemetente[0].id_usuario);
    console.log(resultAcharDestinatario[0].id_usuario);
    const [resultEnviarSolicitacao] = await pool.query(enviarSolicitacaoSQL, [
      resultAcharRemetente[0].id_usuario,
      resultAcharDestinatario[0].id_usuario,
    ]);
    if (!resultEnviarSolicitacao)
      return res.status(401).send("Erro ao tentar enviar a solicitação");
    return res.status(200).send(resultEnviarSolicitacao);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro interno do servidor");
  }
}

export async function aceitarSolicitacao(req, res) {
  const { remetente, destinatario } = req.body;

  const aceitarSolicitacaoSQL =
    "UPDATE conexao set status = 'aceito' where usuario_1 = ? and usuario_2 = ?";
  const acharIdUsuarioPorNomeSQL =
    "SELECT id_usuario from usuario where nome = ?";

  try {
    const [resultAcharRemetente] = await pool.query(acharIdUsuarioPorNomeSQL, [
      remetente,
    ]);
    if (!resultAcharRemetente[0])
      return res.status(404).send("Remetente não encontrado");

    const [resultAcharDestinatario] = await pool.query(
      acharIdUsuarioPorNomeSQL,
      [destinatario]
    );
    if (!resultAcharDestinatario[0])
      return res.status(404).send("Destinatário não encontrado");

    const [resultAceitarSolicitacao] = await pool.query(aceitarSolicitacaoSQL, [
      resultAcharRemetente[0].id_usuario,
      resultAcharDestinatario[0].id_usuario,
    ]);
    if (!resultAceitarSolicitacao)
      return res.status(401).send("Erro ao tentar aceitar a solicitação");
    if (resultAceitarSolicitacao.affectedRows === 0)
      return res
        .status(400)
        .send("Esse usuário não mandou um convite de conexão");
    return res.status(200).send("Convite de conexão aceito");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro interno do servidor");
  }
}

export async function recusarSolicitacao(req, res) {
  const { remetente, destinatario } = req.body;

  const recusarSolicitacaoSQL =
    "DELETE from conexao where usuario_1 = ? and usuario_2 = ?";
  const acharIdUsuarioPorNomeSQL =
    "SELECT id_usuario from usuario where nome = ?";

  try {
    const [resultAcharRemetente] = await pool.query(acharIdUsuarioPorNomeSQL, [
      remetente,
    ]);
    if (!resultAcharRemetente[0])
      return res.status(404).send("Remetente não encontrado");

    const [resultAcharDestinatario] = await pool.query(
      acharIdUsuarioPorNomeSQL,
      [destinatario]
    );
    if (!resultAcharDestinatario[0])
      return res.status(404).send("Destinatário não encontrado");

    const [resultRecusarSolicitacao] = await pool.query(recusarSolicitacaoSQL, [
      resultAcharRemetente[0].id_usuario,
      resultAcharDestinatario[0].id_usuario,
    ]);
    if (!resultRecusarSolicitacao)
      return res.status(401).send("Erro ao tentar recusar a solicitação");
    return res.status(200).send("Convite de conexão recusado");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro interno do servidor");
  }
}

export async function acharConexoes(req, res) {
  const { nome } = req.params;
  const acharUsuarioPorNomeSQL =
    "SELECT id_usuario from usuario where nome = ?";
  const acharConexoesSQL =
    "SELECT u.nome from usuario u join conexao c on c.usuario_1 = ? or c.usuario_2 = ? and usuario_id != ? where c.status = 'aceito'";

  try {
    const [resultAcharUsuarioPorNome] = await pool.query(
      acharUsuarioPorNomeSQL,
      [nome]
    );
    if (!resultAcharUsuarioPorNome[0])
      return res.status(404).send("Usuário não encontrado");

    const [resultAcharConexoes] = await pool.query(acharConexoesSQL, [
      resultAcharUsuarioPorNome[0].usuario_id,
      resultAcharUsuarioPorNome[0].usuario_id,
      resultAcharUsuarioPorNome[0].usuario_id,
    ]);

    if (!resultAcharConexoes)
      return res
        .status(400)
        .send("Erro ao tentar achar as conexões do usuário");

    return res.status(200).send(resultAcharConexoes);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro interno do servidor");
  }
}
