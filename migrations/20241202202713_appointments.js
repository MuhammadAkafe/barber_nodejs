/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('appointments', function(table) {
      table.integer('id');
      table.string('username', 100).notNullable();
      table.string('phonenumber', 100).notNullable();
      table.string('rolefor', 100).notNullable();
      table.timestamp('slot_time').unique().notNullable();
      table.string('payment', 100);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('appointments');
  };
  