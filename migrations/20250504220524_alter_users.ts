import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> 
{
    return await knex.schema.alterTable(`users`,(table)=>{
        table.renameColumn("phone_number","phonenumber");
    })
}


export async function down(knex: Knex): Promise<void> {
        return knex.schema.alterTable("users", (table) => 
            {
          table.renameColumn("phonenumber", "phone_number");
        });
      }

