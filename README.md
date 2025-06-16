# 📚 LinkUS

**LinkUS** é uma aplicação web voltada ao compartilhamento de interesses literários. Usuários podem se conectar, conversar sobre livros, criar postagens, interagir com outros leitores e participar de grupos temáticos.

---

## 🚀 Tecnologias Utilizadas

- **Linguagem:** JavaScript (Node.js + React)
- **Banco de Dados:** MySQL
- **Gerenciamento de Containers:** Docker

---

## 🛠️ Como rodar o projeto

1. **Pré-requisitos:**
   - Docker Desktop instalado
   - Node.js e npm instalados
   - Uma IDE de sua preferência (ex: VS Code)

2. **Configuração**
Crie um arquivo .env e dentro insira:
   ```bash
   PORT=5000
   DB_HOST=127.0.0.1
   DB_USER=root
   DB_PASSWORD=sua_senha
   DB_NAME=nome_do_database
   DB_PORT=3306
4. **Backend**
   ```bash
   cd backend
   docker compose up -d  # Inicia o banco de dados
   npm install           # Instala as dependências
   npm run dev           # Inicia o servidor

5. **Frontend**
   ```bash
   cd frontend
   npm install           # Instala as dependências
   npm run dev           # Inicia o frontend

6. **Acessar a aplicação** <br/>
   http://localhost:5173

## ✨ Funcionalidades Principais
1. 👤 Cadastro e Conexões de Usuário
    - Registro com nome de usuário (único), e-mail, data de nascimento e foto de perfil
    - Autenticação segura com e-mail e senha (senhas criptografadas)
    - Conexões entre usuários por meio de solicitações e aceitações
    - Perfis públicos com exibição de postagens

2. 📝 Postagens e Interações
   - Criação de postagens com:
      Texto, imagem e/ou vídeo
      Data de criação
      Tipo de conteúdo

   - Interações disponíveis:
     Curtidas positivas e negativas
     Comentários e respostas (aninhados)
     Avaliação de comentários

3. 👥 Grupos e Comunidades
    - Criação de grupos temáticos com:
      Nome e descrição únicos
      Lista de membros (administradores ou membros comuns)
  
    - Regras de moderação:
      Apenas administradores podem remover mensagens de outros usuários
      Discussões públicas dentro dos grupos

4. 👨‍💻 Distribuição de Atividades
    - Gabriel — Back-end e Banco de Dados
        - Modelagem e implementação do banco (usuários, postagens, comentários, conexões e grupos)
        - Criação e manutenção de queries SQL (CRUD)
        - Segurança: armazenamento de senhas com hashing
        - Otimização de desempenho nas consultas
    
    - Izabel e Lara — Front-end
        - Desenvolvimento da interface web (React)
        - Funcionalidades de postagens, comentários e interações
        - Criação e gerenciamento de grupos
    
    - Emily — Front-end e Design (Figma)
        - Criação do protótipo visual no Figma
        - Foco em experiência do usuário (UX) e navegação fluida
        - Telas principais: home, login, cadastro e perfil
