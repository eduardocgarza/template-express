import mysql from "mysql";
import MYSQL_CONFIG from "../../config/credentials/mySQLConfig.js";

export default class MySQL2Client {
  constructor() {
    this.pool = mysql.createPool({
      connectionLimit: 8,
      ...MYSQL_CONFIG,
    });
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  // Generic query method
  async query(sql, values) {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, values, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  async closePool() {
    return new Promise((resolve, reject) => {
      this.pool.end((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}
