# LinkUS

Aplicação web para compartilhamento de interesses literários, onde os usuários podem conversar sobre livros, criar conexões, postar conteúdos e participar de grupos temáticos. — 
---

## Tecnologias Utilizadas

- Linguagem: JavaScript
- Banco de Dados: MySQL

---

## Funcionalidades Principais

### 1. Cadastro de Usuários
- Registro com:
  - Nome de usuário (único)
  - E-mail
  - Data de nascimento
  - Foto de perfil
- Autenticação segura via e-mail e senha, com armazenamento seguro das senhas
- Conexões entre usuários por solicitações e aceitações
- Perfis e postagens públicos (não há perfis privados)

### 2. Postagens e Interações
- Criação de postagens públicas com:
  - Data de criação
  - Tipo de conteúdo (texto, imagem, vídeo — com ou sem texto)
  - Conteúdo
- Interações:
  - Avaliações positivas ou negativas nas postagens
  - Comentários em postagens
  - Respostas a comentários (comentários aninhados)
  - Avaliações em comentários

### 3. Grupos e Comunidades
- Criação e participação em grupos temáticos com:
  - Nome único
  - Descrição
  - Data de criação
  - Lista de membros com funções: membro ou administrador
- Regras específicas:
  - Apenas administradores podem apagar mensagens de outros membros
  - Discussões públicas dentro dos grupos

---

## Distribuição de Atividades

### Gabriel — Integração do Banco de Dados (MySQL)
- Modelagem do banco de dados para usuários, postagens, comentários, avaliações, conexões e grupos
- Criação das tabelas e relacionamentos
- Implementação das queries para CRUD (Create, Read, Update, Delete)
- Garantir segurança no armazenamento de senhas (hashing)
- Otimização das consultas para desempenho

### Emily — Front-end (JavaScript)
- Desenvolvimento da interface de usuário responsiva e intuitiva
- Telas de cadastro, login e perfil de usuário
- Visualização e criação de postagens e comentários
- Integração de interações (curtidas, avaliações, respostas)
- Interface para criação e participação em grupos
- Navegação e experiência do usuário (UX)

### Izabel e Lara — Back-end (JavaScript)
- Implementação da API REST para comunicação com o front-end
- Autenticação e autorização de usuários
- Lógica de negócio para cadastro, conexões, postagens, comentários e grupos
- Controle de permissões (ex: somente administradores podem apagar mensagens)
- Validação de dados recebidos
- Integração com o banco de dados (via Gabriel)
- Tratamento de erros e segurança da aplicação

---
