import { PoolClient } from "pg";
import { PostgreSqlConnection } from "../connections/pgconnection";

export class GlobalQuery extends PostgreSqlConnection {
  constructor() {
    super();
  }

  async query(queryText: string, values?: any[]): Promise<any> {
    const client: PoolClient = await this.pool.connect();
    try {
      return await client.query(queryText, values);
    } 
    catch (err) {
      console.error('Database query error:', err);
      throw new Error('Database query failed');
    } 
    finally 
    {
        client.release();
    }
  }
}