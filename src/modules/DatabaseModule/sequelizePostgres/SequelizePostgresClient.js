import { Sequelize } from "sequelize";
import POSTGRES_CONFIG from "../config/postgresConfig.js";

export default class SequelizePostgresClient {
    constructor() {
        this.sequelize = new Sequelize({
            ...POSTGRES_CONFIG,
            dialect: "postgres",
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
