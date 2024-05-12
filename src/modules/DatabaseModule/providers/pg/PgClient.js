import pg from "pg";
import POSTGRES_CONFIG from "../../config/credentials/postgresConfig.js";

const { Client } = pg;

export default class PgClient {
  constructor() {
    this.client = new Client({
      ...POSTGRES_CONFIG,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  async connect() {
    await this.client.connect();
  }

  async query(sql, values = []) {
    try {
      const results = await this.client.query(sql, values);
      return results;
    } catch (error) {
      console.log(`Error Executing Query: ${sql} with values: ${values}`);
      throw error;
    }
  }

  async disconnect() {
    await this.client.end();
  }
}
