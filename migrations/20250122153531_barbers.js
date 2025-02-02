/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
 return  await knex.schema.createTable('barbers', (table) => 
    {
    table.increments('id').primary();
    table.string(`email`).notNullable();
    table.string(`password`).notNullable();
    table.string('barber').notNullable();
    table.string('city').notNullable();
    table.boolean(`isadmin`).notNullable().defaultTo(true);
    table.string('phone_number').notNullable();
    table.time(`opening_time`).notNullable();
    table.time(`closing_time`).notNullable();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  return await knex.schema.dropTableIfExists('barbers');
};
