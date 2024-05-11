import mysql from "mysql";


export default class DatabaseClient {
  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.MYSQL_JAWSDB_DB_HOST,
      user: process.env.MYSQL_JAWSDB_DB_USER,
      password: process.env.MYSQL_JAWSDB_DB_PASSWORD,
      database: process.env.MYSQL_JAWSDB_DB_DATABASE,
      port: process.env.MYSQL_JAWSDB_DB_PORT,
    });
  }

  connect() {
    this.connection.connect();
    console.log("Connected to MySQL Database");
  }

  disconnect() {
    this.connection.end();
    console.log("Disconnected from MySQL Database");
  }
}
