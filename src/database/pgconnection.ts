// database/knex.ts
import knex, { Knex } from "knex";
import dotenv from "dotenv";

// تحميل المتغيرات من .env
dotenv.config();

// إعداد الاتصال حسب بيئة التشغيل
const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg", // اختصار لـ postgresql
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
    },
    migrations: {
      directory: "./migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};

const db = knex(config["development"]);

export default db;
