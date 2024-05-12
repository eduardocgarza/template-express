import PgClient from "../../../modules/DatabaseModule/providers/pg/PgClient.js";
import MySQLClient from "../../../modules/DatabaseModule/providers/mySQL/MySQLClient.js";
import MySQL2Client from "../../../modules/DatabaseModule/providers/mySQL2/MySQL2Client.js";
import PgPromiseClient from "../../../modules/DatabaseModule/providers/pgPromise/PgPromiseClient.js";
import SequelizeMySQLClient from "../../../modules/DatabaseModule/providers/sequelizeMySQL/SequelizeMySQLClient.js";
import SequelizePostgresClient from "../../../modules/DatabaseModule/providers/sequelizePostgres/SequelizePostgresClient.js";


export default async function getStatusHandler(req, res) {
    let pgClient, 
        pgPromiseClient, 
        mySQLClient, 
        mySQL2Client, 
        sequelizeSQLClient,
        sequelizePostgresClient;

    try {
        // Example 1 - Package = "pg"
        pgClient = new PgClient();
        await pgClient.connect();
        const pgResults = await pgClient.query("SELECT VERSION();");

        // Example 2 - Package = "pg-promise"
        pgPromiseClient = new PgPromiseClient();
        const pgPromiseResults = await pgPromiseClient.query("SELECT VERSION();");


        // Example 3 - Package = "mysql"
        mySQLClient = new MySQLClient();
        const mySQLResults = await mySQLClient.query("SELECT VERSION();")

        // Example 4 - Package = "mysql2"
        mySQL2Client = new MySQL2Client();
        const mySQL2Results = await mySQL2Client.query("SELECT VERSION();")

        // // Example 5 - Package = "sequelize" - MySQL
        // sequelizeSQLClient = new SequelizeMySQLClient();
        // const sequelizeSQLResults = await sequelizeSQLClient.query("SELECT VERSION();")
        
        // // Example 6 - Package = "sequelize" - Postgres
        // sequelizePostgresClient = new SequelizePostgresClient();
        // const sequelizePostgresResults = await sequelizePostgresClient.query("SELECT VERSION();")

        return res.json({
            status: "success",
            results: {
                pg: pgResults.rows,
                pgPromise: pgPromiseResults,
                mySQL: mySQLResults,
                mySQL2: mySQL2Results,
                // sequelizeSQL: sequelizeSQLResults,
                // sequelizePostgres: sequelizePostgresResults
            }
        })
        
    }
    catch(error){ 
        console.log(error)
    }
    finally {
        if (pgClient) {
            await pgClient.disconnect();
        }
        if (pgPromiseClient) {
            await pgPromiseClient.disconnect();
        }

        // if (sequelizeSQLClient) {
        //     await sequelizeSQLClient.disconnect();
        // }

        // if (sequelizePostgresClient) {
        //     await sequelizePostgresClient.disconnect();
        // }

    }
}
