import { PoolClient } from "pg";
import { createPool,disconnect } from "../connections/pgconnection";
class DatabaseQueryError extends Error {
    constructor(message: string) 
    {
        super(message);
        this.name = "DatabaseQueryError";
    }
}


  export async function globalQuery(queryText: string, values?: any[]): Promise<any> 
  {
    const client: PoolClient = await createPool();
    try {
      return await client.query(queryText, values);
    } 
    catch (err:any) 
    {
      throw new DatabaseQueryError(`${err.message}`);
    } 
    finally 
    {
        client.release();
    }
  }