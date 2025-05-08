import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> 
{
    return knex.schema.createTable("barbers", (table) => 
        {
        table.increments("barber_id").primary();
        table.string("barber_name").notNullable();
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
        table.string("phonenumber").notNullable;
        table.string("city").notNullable();
        table.time("opening_time").notNullable();
        table.time("closing_time").notNullable();
        table.string("image").nullable();
        table.integer("minutes_for_appointment").notNullable().defaultTo(15);
        table.string("barber_description").nullable();
    });
}


export async function down(knex: Knex): Promise<void> 
{
    return knex.schema.dropTableIfExists("barbers");
}

