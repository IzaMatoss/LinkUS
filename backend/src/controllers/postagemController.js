import pool from "../db.js";

function montarComentariosAninhados(comentarios) {
  const mapa = {};
  const raiz = []; //comentarios da postagem

  for (const comentario of comentarios) {
    comentario.subcomentarios = [];
    mapa[comentario.id_comentario] = comentario;
  }

  for (const comentario of comentarios) {
    if (comentario.fk_comentario_pai) {
      mapa[comentario.fk_comentario_pai]?.subcomentarios.push(comentario);
    } else {
      raiz.push(comentario);
    }
  }

  return raiz;
}

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
  const acharPostagensSQL = `
  SELECT 
      p.id_postagem, 
      p.data_criacao, 
      p.tipo_conteudo, 
      p.texto, 
      p.url_midia, 
      u.nome, 
      u.url_foto,
      JSON_ARRAYAGG(i.nome) as interesses
        FROM 
          postagem p
        JOIN 
          usuario u ON u.id_usuario = p.fk_autor
        LEFT JOIN 
          usuario_interesse ui ON u.id_usuario = ui.fk_usuario
        LEFT JOIN 
          interesse i ON ui.fk_interesse = i.id_interesse
        GROUP BY 
      p.id_postagem`;

  const acharAvaliacoesPositivasSQL =
    "SELECT COUNT(*) as positivas from interacao i join postagem p on i.fk_postagem = p.id_postagem where p.id_postagem = ? and i.tipo = 'like' and i.fk_comentario IS NULL";

  const acharAvaliacoesNegativasSQL =
    "SELECT COUNT(*) as negativas from interacao i join postagem p on i.fk_postagem = p.id_postagem where p.id_postagem = ? and i.tipo = 'dislike' and i.fk_comentario IS NULL";

  const acharComentariosSQL =
    "SELECT c.id_comentario, c.conteudo, c.data_criacao, u.nome, u.url_foto, c.fk_comentario_pai, COALESCE(SUM(i.tipo = 'like'), 0) as positivas, COALESCE(SUM(i.tipo = 'dislike'), 0) as negativas FROM comentario c JOIN usuario u ON u.id_usuario = c.fk_autor LEFT JOIN interacao i ON i.fk_comentario = c.id_comentario WHERE c.fk_postagem = ? GROUP BY c.id_comentario ORDER BY c.data_criacao";

  try {
    const [resultAcharPostagens] = await pool.query(acharPostagensSQL);

    if (!resultAcharPostagens)
      return res.status(401).send("Erro ao tentar achar as postagens");

    await Promise.all(
      resultAcharPostagens.map(async (postagem) => {
        const [[positivas]] = await pool.query(acharAvaliacoesPositivasSQL, [
          postagem.id_postagem,
        ]);
        const [[negativas]] = await pool.query(acharAvaliacoesNegativasSQL, [
          postagem.id_postagem,
        ]);

        postagem.positivas = positivas.positivas;
        postagem.negativas = negativas.negativas;

        const [resultAcharComentarios] = await pool.query(acharComentariosSQL, [
          postagem.id_postagem,
        ]);

        postagem.comentarios = montarComentariosAninhados(
          resultAcharComentarios
        );
      })
    );

    return res.status(200).send(resultAcharPostagens);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro interno do servidor");
  }
}

export async function acharPostagensUsuario(req, res) {
  const acharPostagensSQL =
    "SELECT id_postagem, data_criacao, tipo_conteudo, texto, url_midia, nome, url_foto from postagem p join usuario u on u.id_usuario = p.fk_autor where u.nome = ?";

  const acharAvaliacoesPositivasSQL =
    "SELECT COUNT(*) as positivas from interacao i join postagem p on i.fk_postagem = p.id_postagem where p.id_postagem = ? and i.tipo = 'like' and i.fk_comentario IS NULL";

  const acharAvaliacoesNegativasSQL =
    "SELECT COUNT(*) as negativas from interacao i join postagem p on i.fk_postagem = p.id_postagem where p.id_postagem = ? and i.tipo = 'dislike' and i.fk_comentario IS NULL";

  const acharComentariosSQL =
    "SELECT c.id_comentario, c.conteudo, c.data_criacao, u.nome, u.url_foto, c.fk_comentario_pai, COALESCE(SUM(i.tipo = 'like'), 0) as positivas, COALESCE(SUM(i.tipo = 'dislike'), 0) as negativas FROM comentario c JOIN usuario u ON u.id_usuario = c.fk_autor LEFT JOIN interacao i ON i.fk_comentario = c.id_comentario WHERE c.fk_postagem = ? GROUP BY c.id_comentario ORDER BY c.data_criacao";

  try {
    const [resultAcharPostagens] = await pool.query(acharPostagensSQL, [
      req.params.nome,
    ]);

    if (!resultAcharPostagens)
      return res.status(401).send("Erro ao tentar achar as postagens");

    await Promise.all(
      resultAcharPostagens.map(async (postagem) => {
        const [[positivas]] = await pool.query(acharAvaliacoesPositivasSQL, [
          postagem.id_postagem,
        ]);
        const [[negativas]] = await pool.query(acharAvaliacoesNegativasSQL, [
          postagem.id_postagem,
        ]);

        postagem.positivas = positivas.positivas;
        postagem.negativas = negativas.negativas;

        const [resultAcharComentarios] = await pool.query(acharComentariosSQL, [
          postagem.id_postagem,
        ]);

        postagem.comentarios = montarComentariosAninhados(
          resultAcharComentarios
        );
      })
    );

    return res.status(200).send(resultAcharPostagens);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro interno do servidor");
  }
}
