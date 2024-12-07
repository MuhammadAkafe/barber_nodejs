/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) 
{
    await knex.schema.createTable('users', (table) => {
        table.increments('user_id').primary();
        table.string('username', 100).notNullable();
        table.string('email', 100).notNullable().unique();
        table.string('phonenumber', 100).notNullable();
        table.string('password', 100).notNullable();
        table.boolean('isAdmin').notNullable();
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('users');
};
