/**
 * 
 * @type { Object.<string, import("knex").Knex.Config> }
 */

require('dotenv').config();

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      // host: '127.0.0.1',
      // database: process.env.DB_NAME,
      // user: process.env.DB_USER,
      // password: process.env.DB_PASSWORD,
      // port: 5432,
      // timezone: 'UTC',
      // timeout: 10000, 
      connectionString: 'postgresql://neondb_owner:npg_lxf4u2pSjeoZ@ep-white-glade-a8usy78u-pooler.eastus2.azure.neon.tech/barber?sslmode=require',
      ssl: { rejectUnauthorized: false }, // Required for Neon
    },
    migrations: {
      directory: `./migrations`, // Directory for migration files
    },
    seeds: {
      directory: './seeds', // Directory for seed files
    },
  },


  // Uncomment and customize for staging or production environments
  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     host: 'staging-host',
  //     database: 'staging_db',
  //     user: 'staging_user',
  //     password: 'staging_password',
  //     port: 5432,
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations',
  //     directory: './migrations',
  //   },
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     host: 'production-host',
  //     database: 'prod_db',
  //     user: 'prod_user',
  //     password: 'prod_password',
  //     port: 5432,
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations',
  //     directory: './migrations',
  //   },
  //   seeds: {
  //     directory: './seeds',
  //   },
  // },
};
