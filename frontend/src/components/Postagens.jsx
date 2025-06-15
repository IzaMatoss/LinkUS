import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAutenticador } from "./providers/useAutenticador";
import { usePostagens } from "./providers/usePostagens";
import { createClient } from "@supabase/supabase-js";
import "../css/postagens.css";

function Postagens({ termo }) {
  const { usuario, token } = useAutenticador();
  const { postagens, setReloadPostagens } = usePostagens();
  const [postagensFiltradas, setPostagensFiltradas] = useState(postagens);
  const [midia, setMidia] = useState(null);

  useEffect(
    () =>
      setPostagensFiltradas(
        postagens.filter((postagem) =>
          postagem.texto
            ?.toLowerCase()
            .includes(termo ? termo.toLowerCase() : "")
        )
      ),
    [termo, postagens, setPostagensFiltradas]
  );

  function Comentario({ comentario, post }) {
    return (
      <div id="comentario">
        <img
          src={comentario.url_foto ? comentario.url_foto : "./icons/padrao.svg"}
          alt="Foto do usuário"
        />
        <div>
          <h2>{comentario.nome}</h2>
          <p>{comentario.conteudo}</p>
          <div>
            <img
              onClick={async () => {
                const data = {};
                data.nomeAutor = usuario.nome;
                data.id_postagem = post.id_postagem;
                data.id_comentario = comentario.id_comentario;
                data.tipo = "like";

                try {
                  const result = await fetch(
                    "http://localhost:5000/interacao/criarInteracao",
                    {
                      method: "POST",
                      body: JSON.stringify(data),
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );

                  if (result.status != 200)
                    console.error(
                      "Erro ao tentar interagir na postagem: ",
                      await result.text()
                    );

                  setReloadPostagens();
                } catch (error) {
                  console.error(error);
                }
              }}
              src={
                comentario.interacao && comentario.interacao === "like"
                  ? "./icons/like-dado.svg"
                  : "./icons/like.svg"
              }
              alt="Ícone de like"
              className="interacao"
            />
            <p>{comentario.positivas}</p>
            <img
              onClick={async () => {
                const data = {};
                data.nomeAutor = usuario.nome;
                data.id_postagem = post.id_postagem;
                data.id_comentario = comentario.id_comentario;
                data.tipo = "dislike";

                try {
                  const result = await fetch(
                    "http://localhost:5000/interacao/criarInteracao",
                    {
                      method: "POST",
                      body: JSON.stringify(data),
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );

                  if (result.status != 200)
                    console.error(
                      "Erro ao tentar interagir na postagem: ",
                      await result.text()
                    );

                  setReloadPostagens();
                } catch (error) {
                  console.error(error);
                }
              }}
              src={
                comentario.interacao && comentario.interacao === "dislike"
                  ? "./icons/dislike-dado.svg"
                  : "./icons/dislike.svg"
              }
              alt="Ícone de like"
              className="interacao"
            />
            <p>{comentario.negativas}</p>
          </div>
        </div>
      </div>
    );
  }

  function ListarComentarios({ comentarios, post }) {
    return (
      <div>
        {comentarios.map((c) => (
          <Comentario key={c.id_comentario} comentario={c} post={post} />
        ))}
      </div>
    );
  }

  return (
    <div id="postagens">
      <div id="novo-post" className="conteudo">
        <img
          src={usuario.url_foto ? usuario.url_foto : "./icons/padrao.svg"}
          alt="Foto do usuário"
        />
        <input
          type="text"
          placeholder="Digite o que está pensando..."
          onKeyUp={async (e) => {
            if (e.key === "Enter") {
              const data = {};
              data.texto = e.target.value;
              if (midia && midia.tipo === "imagem") {
                const formData = new FormData();
                formData.append("image", midia.conteudo);
                formData.append("key", "02649a0bafaed4123cfcc89e63003b10");

                try {
                  const res = await fetch("https://api.imgbb.com/1/upload", {
                    method: "POST",
                    body: formData,
                  });

                  const json = await res.json();
                  data.tipo = midia.tipo;
                  data.url_midia = json.data.url;
                } catch (err) {
                  console.error("Erro de rede:", err);
                }
              } else if (midia && midia.tipo === "video") {
                const supabase = createClient(
                  "https://uryeqjptemdyznogbeus.supabase.co",
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyeWVxanB0ZW1keXpub2diZXVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzMDI4OTcsImV4cCI6MjA2NDg3ODg5N30.h-xARu8XNys8En6VbKaH_hiBO-oBRPOzUxkgSh3dOPw"
                );

                const { data, error } = await supabase.storage
                  .from("ebooks")
                  .upload(`epubs/${Date.now()}-${midia.nome}`, midia.conteudo);

                if (error) console.error(error);
                data.url_midia = `https://uryeqjptemdyznogbeus.supabase.co/storage/v1/object/public/ebooks/${data.path}`;
                data.tipo = midia.tipo;
              }

              data.nomeAutor = usuario.nome;

              const result = await fetch(
                "http://localhost:5000/postagem/criarPostagem",
                {
                  method: "POST",
                  body: JSON.stringify(data),
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              e.target.value = "";

              if (result.status != 201) console.error(await result.text());
              else setReloadPostagens((val) => !val);
            }
          }}
        />
        <div>
          <input
            type="file"
            id="midia"
            accept="image/jpeg, image/png, image/gif, image/bmp, image/webp, video/mp4"
            style={{ display: "none" }}
            onChange={(e) => {
              const arquivo = e.target.files[0];
              if (arquivo.type === "video/mp4")
                setMidia({ tipo: "video", arquivo });
              else setMidia({ tipo: "imagem", conteudo: arquivo });
            }}
          />
          <label htmlFor="midia" className="interacao">
            <img src="./icons/enviar.svg" alt="Ícone de adicionar mídia" />
          </label>
        </div>
      </div>
      <ul>
        {postagensFiltradas.map((postagem) => (
          <li
            key={postagem.id_postagem}
            className="conteudo"
            id="conteudo-post"
          >
            <div id="post">
              <img
                src={
                  postagem.url_foto ? postagem.url_foto : "./icons/padrao.svg"
                }
                alt={`Foto do usuário ${postagem.nome}`}
              />
              <div id="info">
                <h2>{postagem.nome}</h2>
                <p>
                  {formatDistanceToNow(new Date(postagem.data_criacao), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </p>
              </div>
            </div>
            <p>{postagem.texto}</p>
            {postagem.tipo_conteudo === "imagem" && (
              <img src={postagem.url_midia} id="imagem-post" />
            )}

            {postagem.tipo_conteudo === "video" && (
              <video controls width="500" id="video-post">
                <source src={postagem.url_midia} type="video/mp4" />
              </video>
            )}
            <ul>
              <li>
                <img
                  onClick={async () => {
                    if (!postagem.interacao) {
                      const data = {};
                      data.id_postagem = postagem.id_postagem;
                      data.nomeAutor = usuario.nome;
                      data.tipo = "like";

                      try {
                        const result = await fetch(
                          "http://localhost:5000/interacao/criarInteracao",
                          {
                            method: "POST",
                            body: JSON.stringify(data),
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        );

                        if (result.status != 200)
                          console.error(
                            "Erro ao tentar interagir na postagem: ",
                            await result.text()
                          );

                        setReloadPostagens();
                      } catch (error) {
                        console.error(error);
                      }
                    }
                  }}
                  className="interacao"
                  src={
                    postagem.interacao && postagem.interacao === "like"
                      ? "./icons/like-dado.svg"
                      : "./icons/like.svg"
                  }
                  alt="Ícone de like"
                />
                <p>{postagem.positivas}</p>
              </li>
              <li>
                <img
                  onClick={async () => {
                    if (!postagem.interacao) {
                      const data = {};
                      data.id_postagem = postagem.id_postagem;
                      data.nomeAutor = usuario.nome;
                      data.tipo = "dislike";

                      try {
                        const result = await fetch(
                          "http://localhost:5000/interacao/criarInteracao",
                          {
                            method: "POST",
                            body: JSON.stringify(data),
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        );

                        if (result.status != 200)
                          console.error(
                            "Erro ao tentar interagir na postagem: ",
                            await result.text()
                          );

                        setReloadPostagens();
                      } catch (error) {
                        console.error(error);
                      }
                    }
                  }}
                  className="interacao"
                  src={
                    postagem.interacao && postagem.interacao === "dislike"
                      ? "./icons/dislike-dado.svg"
                      : "./icons/dislike.svg"
                  }
                  alt="Ícone de dislike"
                />
                <p>{postagem.negativas}</p>
              </li>
              <li id="novo-comentario">
                <input
                  type="text"
                  placeholder="comente algo"
                  onKeyUp={async (e) => {
                    if (e.key === "Enter" && e.target.value) {
                      const data = {};
                      data.id_postagem = postagem.id_postagem;
                      data.nomeAutor = usuario.nome;
                      data.conteudo = e.target.value;

                      try {
                        const result = await fetch(
                          "http://localhost:5000/comentario/criarComentarioPostagem",
                          {
                            method: "POST",
                            body: JSON.stringify(data),
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        );

                        if (result.status != 201)
                          console.error(
                            "Erro ao criar comentário na postagem: " +
                              (await result.text())
                          );
                        else setReloadPostagens((val) => !val);
                        e.target.value = "";
                      } catch (error) {
                        console.error(error);
                      }
                    }
                  }}
                />
              </li>
            </ul>
            <ListarComentarios
              comentarios={postagem.comentarios}
              post={postagem}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Postagens;
