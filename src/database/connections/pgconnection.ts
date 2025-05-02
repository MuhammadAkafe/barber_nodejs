import { Pool } from 'pg';
import { PoolClient } from 'pg';
let pool: Pool | null = null;

export function createPool():  Promise<PoolClient> {
    if (!pool) 
        {
        const connectionString = process.env.DATABASE_URL || process.env.connectionString;

        if (!connectionString) 
            {
            throw new Error('Database connection string is not defined');
        }
        pool = new Pool({
            connectionString,
            ssl: { rejectUnauthorized: false }, // Needed for Neon or other managed DBs
        });
        console.log('PostgreSQL pool created');
    }
    
    return pool.connect();
}

export async function disconnect(): Promise<void> {
    if (pool) {
        await pool.end();
        console.log('PostgreSQL connection pool closed');
        pool = null;
    }
}
