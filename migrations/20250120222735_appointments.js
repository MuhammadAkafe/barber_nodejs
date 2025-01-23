/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
 return await knex.schema.createTable('appointments', (table) => {  
    table.increments('userid').primary();
    table.string('username').notNullable();
    table.string('phonenumber').notNullable();
    table.string('barber').notNullable();
    table.string('city').notNullable
    table.timestamp('slot_date',{useTz:false}).notNullable();
    table.string('rolefor').notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
 return await knex.schema.dropTableIfExists('appointments');
};
