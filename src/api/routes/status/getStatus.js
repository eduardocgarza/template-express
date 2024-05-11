import PostgresClient from "../../../modules/DatabaseModule/pg/PostgresClient.js";


export default async function getStatusHandler(req, res) {
    let connection;

    try {
        connection = new PostgresClient();
        await connection.connect();
        const result = await connection.client.query("SELECT VERSION();");

        return res.json({
            status: "success",
            data: result.rows
        })
        
    }
    catch(error){ 
        console.log(error)
    }
    finally {
        if (connection) {
            await connection.disconnect();
        }
    }
}
