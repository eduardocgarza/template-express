import dotenv from "dotenv";
dotenv.config();


const POSTGRES_CONFIG = {
  host: process.env.PG_HEROKU_DB_HOST,
  user: process.env.PG_HEROKU_DB_USER,
  password: process.env.PG_HEROKU_DB_PASSWORD,
  database: process.env.PG_HEROKU_DB_DATABASE,
  port: process.env.PG_HEROKU_DB_PORT,
} 


export default POSTGRES_CONFIG;
