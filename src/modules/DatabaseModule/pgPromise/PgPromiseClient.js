import pgPromise from 'pg-promise';
import POSTGRES_CONFIG from "../config/credentials/postgresConfig.js";

const pgp = pgPromise();

export default class PgPromiseClient {
    
    constructor() {
        this.db = pgp({
            ...POSTGRES_CONFIG,
            ssl: {
                rejectUnauthorized: false  
            }
        });
    }

    query(sql, params) {
        return this.db.any(sql, params);
    }

    // Method to disconnect from the database
    async disconnect() {
        pgp.end();
        console.log("Database Connections Closed.");
    }
}
