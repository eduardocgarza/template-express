import dotenv from "dotenv";
dotenv.config();

const MYSQL_CONFIG = {
  host: process.env.MYSQL_JAWSDB_DB_HOST,
  user: process.env.MYSQL_JAWSDB_DB_USER,
  password: process.env.MYSQL_JAWSDB_DB_PASSWORD,
  database: process.env.MYSQL_JAWSDB_DB_DATABASE,
  port: process.env.MYSQL_JAWSDB_DB_PORT,
};

export default MYSQL_CONFIG;
