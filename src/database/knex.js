import Knex from "knex";
import dotenv from "dotenv";
dotenv.config();

const knex = Knex({
  client: "mysql2",
  connection: {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
});

export default knex;
