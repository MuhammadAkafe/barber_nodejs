import { PoolClient } from "pg"
import { PostgreSqlConnection  } from "../connections/pgconnection"

export class GlobalQuery extends PostgreSqlConnection
{
    constructor()
    {
        super()
    }
    async query(queryText: string, values?: any[]): Promise<any> {
        const client: PoolClient = await this.pool.connect(); // Get a client from the pool
        try {
            const result = await client.query(queryText, values);
            return result;
        } 
        catch (err) 
        {
            throw err;
        } 
        finally {
            client.release(); // Return the client to the pool
        }
    }


}