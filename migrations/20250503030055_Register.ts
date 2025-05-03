import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> 
{
    return await knex.schema.createTable('users', function (table) 
    {
        table.increments("userid").primary(); // auto-incrementing unique ID
        table.string('username');
        table.string('email');
        table.string('phone_number');
        table.string('password');
      });
}


export async function down(knex: Knex): Promise<void> 
{
   return await  knex.schema.dropTableIfExists('users');

}

