/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.exports.up = async function(knex) {
  return  await knex.schema.createTable('users', (table) => {
    table.increments('userid').primary();
    table.string('username').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('phonenumber').notNullable();
    table.boolean('isadmin').notNullable().defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.exports.down = async function(knex) {
  return  await knex.schema.dropTableIfExists('users');
};
