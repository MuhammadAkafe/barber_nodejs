import { PoolClient } from "pg";
import { PostgreSqlConnection } from "../connections/pgconnection";

class DatabaseQueryError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DatabaseQueryError";
    }
}

export class GlobalQuery extends PostgreSqlConnection {
  constructor() {
    super();
  }

  async query(queryText: string, values?: any[]): Promise<any> {
    const client: PoolClient = await this.pool.connect();
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
}