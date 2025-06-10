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
	id_conexao char(36) primary key default (uuid()),
    usuario_1 char(36) not null,
    usuario_2 char(36) not null,
    foreign key(usuario_1) references usuario(id_usuario),
	foreign key(usuario_2) references usuario(id_usuario)
);

create table if not exists grupo (
	id_grupo char(36) primary key default (uuid()),
    nome varchar(100) not null,
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
    fk_conexao char(36),
    fk_remetente char(36) not null,
    fk_grupo char(36),
    foreign key(fk_conexao) references conexao(id_conexao),
	foreign key(fk_remetente) references usuario(id_usuario),
    foreign key(fk_grupo) references grupo(id_grupo),
    constraint um_preenchido check (
		    (fk_conexao is not null or fk_grupo is not null) and
        (fk_conexao is null or fk_grupo is null)
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
    tipo_conteudo enum("audio", "imagem"),
    texto text,
    url_midia varchar(150),
    fk_autor char(36) not null,
    foreign key(fk_autor) references usuario(id_usuario),
    constraint algum_preenchido check(
		    (texto is not null or url_midia is not null) and 
        (texto is null or url_midia is null)
    )
);

create table if not exists comentario(
	id_comentario char(36) primary key default (uuid()),
    conteudo text not null,
	fk_autor char(36) not null,
    fk_postagem char(36) not null,
    fk_comentario_pai char(36),
    foreign key(fk_autor) references usuario(id_usuario),
	foreign key(fk_postagem) references postagem(id_postagem),
	foreign key(fk_comentario_pai) references comentario(id_comentario)
);