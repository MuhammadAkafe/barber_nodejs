import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("appointments", (table) => {
    table.integer("userid").references("userid").inTable("users").onDelete("CASCADE").onUpdate("CASCADE");
    table.increments("appointment_id").primary();
    table.string("username").notNullable();
    // ✅ تعيين النوع المناسب لتاريخ ووقت الموعد
    table.date("appointment_date").notNullable();  // نوع: Date
    table.time("appointment_time").notNullable();  // نوع: Time
    table.string("city");
    table.string("phonenumber").notNullable();
    table.string("rolefor").notNullable();
    table.integer("barber").references("barber_id").inTable("barbers").onDelete("CASCADE").onUpdate("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> 
{
  return knex.schema.dropTableIfExists("appointments");
}
