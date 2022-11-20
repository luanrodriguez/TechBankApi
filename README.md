Api do TechBank.

Desenvolvido com Typescript, Express, Prisma e Postgres.

Para executar o software é necessário ter Node v16.17.0 e Docker.

Acesse o arquivo docker-compose e escolha um usuário ou senha para o banco de dados, ou deixe o padrão.

Utilizando o cmd, digite docker-compose up -d, isso criará um container com um banco de dados Postgres.

Com o container rodando, crie um arquivo .env e siga o exemplo do .env.example. No DATABASE_URL, digite a url que foi criada pelo docker-compose. Caso tenha deixado o login e senha conforme padrão, pode se utilizar a mesma url do .env.example.

a JWT_SECRET fica a sua escolha.

O próximo passo é executar o comando npm install, que irá instalar as dependências do projeto.

Com o container rodando e as dependências instaladas, basta executar npm run start que a API irá ser executada.