import { Pool } from 'pg';


export class PostgreSqlConnection  {
    public pool: Pool;
    constructor() 
    {
        this.pool = new Pool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: 5432, 
        });
        console.log('PostgreSQL connection pool created');
    }
    
    async disconnect(): Promise<void> 
    {
        // This should be called when the application is shutting down
        await this.pool.end(); // Close the pool
        console.log('PostgreSQL connection pool closed');
    }
    
}
