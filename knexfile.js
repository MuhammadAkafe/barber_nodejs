/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: "localhost",
      database: 'barber',
      user: 'postgres',
      password: '!postgres!',
      port: 5432,
    },
    migrations: {
      directory: `./migrations/functions`, // Directory for migration files
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
