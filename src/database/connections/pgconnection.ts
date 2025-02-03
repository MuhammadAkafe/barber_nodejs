import { Pool } from 'pg';

export class PostgreSqlConnection {
    protected pool: Pool;

    constructor() {
        this.pool = this.createPool();
        console.log('PostgreSQL connection pool created');
    }

    private createPool(): Pool {
        return new Pool({
            // host: process.env.DB_HOST,
            // user: process.env.DB_USER,
            // password: process.env.DB_PASSWORD,
            // database: process.env.DB_NAME,
            // port: Number(process.env.DB_PORT) || 5432,
                connectionString: process.env.connectionString,
                ssl: { rejectUnauthorized: false }, // Required for Neon
        });
    }

    async disconnect(): Promise<void> {
        await this.pool.end();
        console.log('PostgreSQL connection pool closed');
    }
}
