import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> 
{
    return knex.schema.createTable("barbers", (table) => 
        {
        table.increments("barber_id").primary();
        table.string("barber_name").notNullable().unique();
        table.string("email").notNullable().unique();
        table.string("password").notNullable().unique();
        table.string("barber_phonenumber").notNullable();
        table.string("city").notNullable();
        table.string("opening_time").notNullable();
        table.string("closing_time").notNullable();
        table.string("image").notNullable();
        table.integer("minutes_for_solt").notNullable().defaultTo(15);
        table.string("barber_description").nullable();
    });
}


export async function down(knex: Knex): Promise<void> 
{
    return knex.schema.dropTableIfExists("barbers");
}

