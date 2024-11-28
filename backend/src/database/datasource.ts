import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../models/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres", // Altere conforme necessário
  password: "postgres", // Altere conforme necessário
  database: "postgres", // Altere conforme necessário
  synchronize: true, // Apenas para desenvolvimento. Não use em produção!
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => console.log("Data Source has been initialized!"))
  .catch((err) =>
    console.error("Error during Data Source initialization", err)
  );
