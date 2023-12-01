# Backend para o projeto de teste do Panda Video

## Como rodar a aplicação

### Requisitos para rodar para produção:
Docker

- Crie um `.env` se baseando no `.env.example`
- `docker compose up` para subir o banco e a aplicação backend

### Para rodar para desenvolvimento:

- Crie um `.env` se baseando no `.env.example`
- suba o banco com `docker compose up -d mongo`
- atualize o `.env` para usar `localhost` no lugar do nome do container do docker
- utilizar o comando `yarn dev`
- não recomendo usar o docker para desenvolvimento por conta do [bug do bcrypt](https://medium.com/hacktive-devs/the-bcrypt-bg-on-docker-9bc36cc7f684)

## Notas sobre o desenvolvimento

### Tecnologias utilizadas

- Express: lib mais popular de HTTP, simples de se utilizar. NestJS seria um canhão para o tamanho desse projeto.
- Inversify: implementação de inversão de dependência de forma mais simplificada
- Mongo: como nesse projeto não seria tão necessário um banco relacional, optei pelo mongo pela simplicidade
- Yup: lib de validação de objetos, de fácil implementação, com mensagens de erros prontas

### Comentários

- Em algumas instâncias usei a inversão de dependência para a implementação de interface, em outros momentos, para facilidade do desenvolvimento, optei por não usar a inversão.
- Tive que expor publicamente as rotas do CDN através de um proxy para o frontend conseguir utilizá-las.

### Pontos de melhoria

- Implementar o cache
- Escrever os testes unitários e de integração