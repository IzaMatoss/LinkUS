import pool from "../db.js";

export async function mandarMensagem(req, res) {
  const { nomeRemetente, nomeDestinatario, texto } = req.body;
  const acharUsuarioPorNomeSQL =
    "SELECT id_usuario from usuario where nome = ?";
  const mandarMensagemSQL =
    "INSERT INTO mensagem(texto, fk_destinatario, fk_remetente) values(?, ?, ?)";

  try {
    const [resultAcharRemetente] = await pool.query(acharUsuarioPorNomeSQL, [
      nomeRemetente,
    ]);
    if (!resultAcharRemetente[0])
      return res.status(404).send("Remetente não encontrado");

    const [resultAcharDestinatario] = await pool.query(acharUsuarioPorNomeSQL, [
      nomeDestinatario,
    ]);
    if (!resultAcharDestinatario[0])
      return res.status(404).send("Destinatário não encontrado");

    const [resultMandarMensagem] = await pool.query(mandarMensagemSQL, [
      texto,
      resultAcharDestinatario[0].id_usuario,
      resultAcharRemetente[0].id_usuario,
    ]);

    if (!resultMandarMensagem)
      return res.status(400).send("Erro ao enviar a mensagem");

    return res.status(200).send("Mensagem enviada com sucesso");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro interno do servidor");
  }
}

export async function atualizarStatusMensagens(req, res) {
  const { nomeRemetente, nomeDestinatario, status } = req.body;
  const acharUsuarioPorNomeSQL =
    "SELECT id_usuario from usuario where nome = ?";
  let atualizarStatusMensagensSQL;
  if (status == "entregue")
    atualizarStatusMensagensSQL =
      "UPDATE mensagem set status = 'entregue' where status = 'enviado'";
  else if (status == "visualizado")
    atualizarStatusMensagensSQL =
      "UPDATE mensagem set status = 'visualizado' where status = 'entregue'";
  else return res.status(400).send("Insira um status válido");
  try {
    const [resultAcharRemetente] = await pool.query(acharUsuarioPorNomeSQL, [
      nomeRemetente,
    ]);
    if (!resultAcharRemetente[0])
      return res.status(404).send("Remetente não encontrado");

    const [resultAcharDestinatario] = await pool.query(acharUsuarioPorNomeSQL, [
      nomeDestinatario,
    ]);
    if (!resultAcharDestinatario[0])
      return res.status(404).send("Destinatário não encontrado");

    const [resultAtualizarStatusMensagens] = await pool.query(
      atualizarStatusMensagensSQL
    );
    if (!resultAtualizarStatusMensagens)
      return res
        .status(400)
        .send("Erro ao tentar atualizar os status das mensagens");

    return res.status(200).send("Mensagens atualizadas com sucesso");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro interno do servidor");
  }
}

export async function listarConversasUsuario(req, res) {
  const { email } = req.params;
  const listarConversasUsuarioSQL =
    "SELECT m.texto, m.data_envio, m.status, IF(u1.email = ?, u2.nome, u1.nome), IF(u1.email = ?, u2.url_foto, u1.url_foto) FROM mensagem m JOIN usuario u1 ON u1.id_usuario = m.fk_remetente JOIN usuario u2 ON u2.id_usuario = m.fk_destinatario WHERE u1.email = ? OR u2.email = ? ORDER BY m.data_envio DESC";
  if (!email) return res.status(400).send("informe todos os campos");
  try {
    const [resultListarConversasUsuarios] = await pool.query(
      listarConversasUsuarioSQL,
      [email, email, email, email]
    );
    if (!resultListarConversasUsuarios)
      return res
        .status(400)
        .send("Erro ao tentar listar as conversas do usuário");

    return res.status(200).send(resultListarConversasUsuarios);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro interno do servidor");
  }
}

export async function mandarMensagemGrupo(req, res) {
  const { nomeRemetente, nomeGrupo, texto } = req.body;
  const acharUsuarioPorNomeSQL =
    "SELECT id_usuario from usuario u join participante p on p.fk_participante = u.id_usuario join grupo g on p.fk_grupo = g.id_grupo where u.nome = ? and g.nome = ?";
  const acharGrupoPorNomeSQL = "SELECT id_grupo from grupo where nome = ?";
  const mandarMensagemGrupoSQL =
    "INSERT INTO mensagem(texto, fk_grupo, fk_remetente) values(?, ?, ?)";

  try {
    const [resultAcharUsuarioPorNome] = await pool.query(
      acharUsuarioPorNomeSQL,
      [nomeRemetente, nomeGrupo]
    );
    if (!resultAcharUsuarioPorNome[0])
      return res.status(404).send("O remetente não está no grupo");

    const [resultAcharGrupoPorNome] = await pool.query(acharGrupoPorNomeSQL, [
      nomeGrupo,
    ]);
    if (!resultAcharGrupoPorNome[0])
      return res.status(404).send("O grupo não foi encontrado");

    const [resultMandarMensagemGrupo] = await pool.query(
      mandarMensagemGrupoSQL,
      [
        texto,
        resultAcharGrupoPorNome[0].id_grupo,
        resultAcharUsuarioPorNome[0].id_usuario,
      ]
    );
    if (!resultMandarMensagemGrupo.affectedRows)
      return res.status(400).send("Erro ao tentar mandar a mensagem no grupo");

    return res.status(200).send("Mensagem enviada ao grupo com sucesso");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro interno do servidor");
  }
}

export async function excluirMensagemGrupo(req, res) {
  const { nomeAdmin, nomeGrupo, id_mensagem } = req.body;
  const acharFuncaoPorNomeSQL =
    "SELECT p.funcao from usuario u join participante p on p.fk_participante = u.id_usuario join grupo g on g.id_grupo = p.fk_grupo where u.nome = ? and g.nome = ?";
  const excluirMensagemGrupoSQL = "DELETE from mensagem where id_mensagem = ?";

  try {
    const [resultAcharFuncaoPorNome] = await pool.query(acharFuncaoPorNomeSQL, [
      nomeAdmin,
      nomeGrupo,
    ]);
    if (!resultAcharFuncaoPorNome[0])
      return res.status(404).send("O remetente não foi encontrado");

    if (resultAcharFuncaoPorNome[0].funcao != "admin")
      return res
        .status(403)
        .send("Somente administradores podem apagar mensagens");

    const [resultExcluirMensagemGrupo] = await pool.query(
      excluirMensagemGrupoSQL,
      [id_mensagem]
    );

    if (!resultExcluirMensagemGrupo)
      return res.status(400).send("Erro ao excluir a mensagem do grupo");

    return res.status(200).send("Mensagem excluída do grupo com sucesso");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro interno do servidor");
  }
}
