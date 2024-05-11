import pg from "pg";

const { Client } = pg;

export default class PostgresClient {
  constructor() {
    this.client = new Client({
      host: process.env.PG_HEROKU_DB_HOST,
      database: process.env.PG_HEROKU_DB_DATABASE,
      user: process.env.PG_HEROKU_DB_USER,
      port: process.env.PG_HEROKU_DB_PORT,
      password: process.env.PG_HEROKU_DB_PASSWORD,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  async connect() {
    await this.client.connect();
  }

  async disconnect() {
    await this.client.end();
  }
}
