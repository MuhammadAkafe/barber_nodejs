import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        { username:"muhammad" ,email: "aboakfe97@gmail.com",phone_number:"0524366637",password:"1234", },
        { username:"aqfa" ,email: "allappsdata97@gmail.comakfe97",password:"1234",phone_number:"0524377637" },
        { username:"foad" ,email: "abc@gmail.com",password:"1234",phone_number:"0524355637" }
    ]);
};
