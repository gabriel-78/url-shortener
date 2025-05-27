# 📌 Brev.ly - Encurtador de URL

Aplicação fullstack que permite:

- Cadastro, listagem e remoção de links encurtados  
- Redirecionamento do link encurtado para o link original  
- Geração de relatório de acessos em arquivo `.CSV`

Ideal para quem precisa compartilhar links curtos e acompanhar seu desempenho.

---

## 🚀 Tecnologias Utilizadas

### Frontend:
- React (com TypeScript)  
- Tailwind CSS  
- Axios  
- Zod  
- React Hook Form  
- clsx  
- Context API  
- React Router DOM  
- Phosphor Icons

### Backend:
- Node.js (com TypeScript)  
- Fastify  
- Zod  
- Drizzle ORM  
- AWS SDK

### Banco de Dados:
- PostgreSQL

---

## 🛠️ Como rodar o projeto localmente

### Pré-requisitos
- Node.js instalado  
- Docker (opcional)  
- Banco de dados PostgreSQL  

### Rodando localmente (sem Docker)

1. Clone o repositório: git clone https://github.com/gabriel-78/url-shortener.git

2. Instale as dependências do Front-end:
>cd web
>
>npm install ou pnpm install, caso queira usar o pnpm

3. Instale as dependências do Back-end:
> Volte para a raiz do projeto
>
> cd server
>
> npm install

4. Configure as variáveis de ambiente:

Na pasta server, crie um arquivo .env com:

> PORT=Porta_de_saída ex(3000)
>
> DATABASE_URL=postgresql://usuario:senha@localhost:5432/url-shortener
>
> CLOUDFLARE_ACCOUNT_ID=""
>
> CLOUDFLARE_ACCESS_KEY_ID=""
>
> CLOUDFLARE_SECRET_ACCESS_KEY=""
>
> CLOUDFLARE_BUCKET=""
>
> CLOUDFLARE_PUBLIC_URL=""

Na pasta web, crie um arquivo .env.development e um .env.production com:
> para o development: VITE_API_URL=http://localhost:3000
>
> para o production: VITE_API_URL=url_do_servidor_para_consumo 

6. Execute as migrações no banco de dados:
> **npm run db:migrate**
>
> **npm run db:generate**
>> **Importante**: Verifique se DATABASE_URL está apontando para seu banco local.

7. Vá para a pasta server e inicie o backend:
> **npm run dev**

8. Em outra aba do terminal, vá para a pasta web inicie o frontend:
> **npm run dev** ou **npm run prod**

### Rodando com Docker (somente backend)

> ⚠️ Atualmente, o Docker está configurado apenas para a aplicação backend. O frontend deve ser executado manualmente via terminal.

1. Configure as variáveis de ambiente, na pasta server crie um arquivo .env com conforme o arquivo .env.example:

> PORT=Porta_de_saída_da_aplicação ex(3000)
>
> DATABASE_URL=postgres://docker:docker@db:5432/url-shortener
>
> CLOUDFLARE_ACCOUNT_ID=""
>
> CLOUDFLARE_ACCESS_KEY_ID=""
>
> CLOUDFLARE_SECRET_ACCESS_KEY=""
>
> CLOUDFLARE_BUCKET=""
>
> CLOUDFLARE_PUBLIC_URL=""

2. Execute o build e suba os containers:

> docker-compose up --build -d

3. Para aplicar as migrações:

> Abra .env na pasta server
>
> Comente a linha original do DATABASE_URL (ex: postgres://docker:docker@db:5432/url-shortener)
>
> Temporariamente, altere para: DATABASE_URL=postgresql://docker:docker@localhost:5432/url-shortener

4. Execute as migrações:

>npm run db:migrate
>
>npm run db:generate

5. Volte o .env para o estado original.

6. Vá para a pasta web inicie o frontend:
> **npm run dev** ou **npm run prod**

## ✍️ Autor
Gabriel de Almeida Rodrigues
https://github.com/gabriel-78

