import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { AppDataSource } from "./src/database/datasource";
import { UserResolver } from "./src/resolvers/UserResolver";
import path from "path";

async function main() {
  // Inicializa o banco de dados
  await AppDataSource.initialize();

  // Cria o schema GraphQL
  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });

  // Inicializa o servidor Apollo
  const server = new ApolloServer({ schema });
  const { url } = await server.listen();
  console.log(`Server running on ${url}`);
}

main().catch((err) => {
  console.error(err);
});
