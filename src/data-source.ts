import "reflect-metadata";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: typeof process.env.DB_PORT === "number" ? process.env.DB_PORT : 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DB || "wheelie",
  synchronize: true,
  logging: false,
  entities: ["src/entities/*.entity.ts"],
  migrations: [],
  subscribers: [],
});

export { AppDataSource };
