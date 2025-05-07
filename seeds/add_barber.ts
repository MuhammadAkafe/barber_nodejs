import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("barbers").del();

    // Inserts seed entries
    await knex("barbers").insert([
        { barber_name: "mohammed", email: "a@gmail.com",password: "1234", 
        phonenumber: "0524366637", city: "haifa", opening_time: "08:00:00", 
        closing_time: "20:00:00", image: "https://image.com/image1.jpg", minutes_for_solt: 15, 
        barber_description: "Best barber in town" },
    ]);
};
