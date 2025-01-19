/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('appointments', function(table) 
  {
      table.integer('userid').unsigned().notNullable();
      table.string('userName', 100).notNullable();
      table.string('city', 100).notNullable();
      table.string('barber', 100).notNullable();
      table.string('phoneNumber', 100).notNullable();
      table.string('roleFor', 100).notNullable();
      table.timestamp('date', { useTz: false }).unique().notNullable(); // Disable timezone
  });
};

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = function(knex) {
  return knex.schema.dropTable('appointments');
};
