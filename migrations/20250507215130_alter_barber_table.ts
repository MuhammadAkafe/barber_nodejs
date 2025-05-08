import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("barbers", (table) => {
        table.renameColumn("minutes_for_solt","minutes_for_appointment");
    });

}


export async function down(knex: Knex): Promise<void> {
}

