import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> 
{
    await knex.schema.alterTable("barbers", (table) => {
        table.setNullable("barber_description");
        table.setNullable("image");
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("barbers", (table) => {
        table.setNullable("barber_description");
        table.setNullable("image");
    });
}

