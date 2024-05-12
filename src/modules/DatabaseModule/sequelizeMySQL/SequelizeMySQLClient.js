import { Sequelize } from "sequelize";
import MYSQL_CONFIG from "../config/credentials/mySQLConfig.js";

export default class SequelizeMySQLClient {
    constructor() {
        this.sequelize = new Sequelize({
            ...MYSQL_CONFIG,
            dialect: "mysql",
        });
    }

    async connect() {
        await this.sequelize.authenticate();
        console.log("Connection has been established successfully.");
    }

    async query(sql) {
        const results = await this.sequelize.query(sql);
        return results;
    }

    async disconnect() {
        await this.sequelize.close();
        console.log("Database Connections Closed.");
    }

    
}
