create database if not exists linkus;
use linkus;

create table if not exists interesse (
	id_interesse char(36) primary key default (uuid()),
    nome varchar(30) not null
);

create table if not exists usuario (
	id_usuario char(36) primary key default (uuid()),
    nome varchar(150) not null unique,
	email varchar(200) not null unique,
    senha varchar(100) not null,
    url_foto varchar(150),
    data_nascimento date not null
);

create table if not exists usuario_interesse (
	fk_interesse char(36),
    fk_usuario char(36),
    primary key(fk_interesse, fk_usuario),
    foreign key(fk_interesse) references interesse(id_interesse),
    foreign key(fk_usuario) references usuario(id_usuario)
);

create table if not exists conexao (
    usuario_1 char(36) not null,
    usuario_2 char(36) not null,
    status enum("solicitado", "aceito") default "solicitado",
    primary key(usuario_1, usuario_2),
    foreign key(usuario_1) references usuario(id_usuario),
	foreign key(usuario_2) references usuario(id_usuario)
);

create table if not exists grupo (
	id_grupo char(36) primary key default (uuid()),
    nome varchar(100) not null unique,
    descricao text not null,
    data_criacao datetime default current_timestamp,
    fk_criador char(36) not null,
    foreign key(fk_criador) references usuario(id_usuario)
);

create table if not exists mensagem (
	id_mensagem char(36) primary key default (uuid()),
    texto text not null,
    data_envio datetime default current_timestamp,
    status enum("enviado", "entregue", "visualizado") default "enviado",
    fk_destinatario char(36),
    fk_remetente char(36) not null,
    fk_grupo char(36),
    foreign key(fk_destinatario) references usuario(id_usuario),
	foreign key(fk_remetente) references usuario(id_usuario),
    foreign key(fk_grupo) references grupo(id_grupo),
    constraint um_preenchido check (
		    (fk_destinatario is not null or fk_grupo is not null) and
        (fk_destinatario is null or fk_grupo is null)
	)
);

create table if not exists participante(
	fk_grupo char(36),
    fk_participante char(36),
    funcao enum("admin", "user") default "user",
    primary key(fk_grupo, fk_participante),
    foreign key(fk_grupo) references grupo(id_grupo),
    foreign key(fk_participante) references usuario(id_usuario)
);

create table if not exists postagem(
	id_postagem char(36) primary key default (uuid()),
    data_criacao datetime default current_timestamp,
    tipo_conteudo enum("video", "imagem"),
    texto text,
    url_midia varchar(150),
    fk_autor char(36) not null,
    foreign key(fk_autor) references usuario(id_usuario),
    constraint algum_preenchido check(
        texto is not null or url_midia is not null
    )
);

create table if not exists comentario(
	id_comentario char(36) primary key default (uuid()),
    data_criacao datetime default current_timestamp,
    conteudo text not null,
	fk_autor char(36) not null,
    fk_postagem char(36) not null,
    fk_comentario_pai char(36),
    foreign key(fk_autor) references usuario(id_usuario),
	foreign key(fk_postagem) references postagem(id_postagem),
	foreign key(fk_comentario_pai) references comentario(id_comentario)
);

create table if not exists interacao(
	id_interacao char(36) primary key default (uuid()),
	tipo enum("like", "dislike") not null,
	fk_postagem char(36) not null,
    fk_usuario char(36) not null,
    fk_comentario char(36),
    foreign key(fk_postagem) references postagem(id_postagem),
    foreign key(fk_usuario) references usuario(id_usuario),
	foreign key(fk_comentario) references comentario(id_comentario)
);

DELIMITER $$

CREATE TRIGGER after_novo_participante
AFTER INSERT ON participante
FOR EACH ROW
BEGIN
    INSERT INTO mensagem (texto, fk_remetente, fk_grupo)
    VALUES (
        CONCAT(
            'Bem-vindo(a) ao grupo! Usuário ',
            (SELECT nome FROM usuario WHERE id_usuario = NEW.fk_participante),
            ' agora faz parte do grupo.'
        ),
        NEW.fk_participante,
        NEW.fk_grupo
    );
END$$

DELIMITER ;