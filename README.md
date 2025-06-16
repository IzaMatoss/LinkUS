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

### Izabel e Lara — Front-end (JavaScript)
- Desenvolvimento da interface de usuário responsiva e intuitiva
- Visualização e criação de postagens e comentários
- Integração de interações (curtidas, avaliações, respostas)
- Interface para criação e participação em grupos

### Emily — Front-end e Figma 
- Criação do modelo figma
- Navegação e experiência do usuário (UX)
- Página inicial
- Telas de cadastro, login e perfil de usuário
---
