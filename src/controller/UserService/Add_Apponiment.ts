import { Request, Response } from "express";
import db from "../../database/pgconnection"; // استبدال pgconnection بـ knex
export async function Add_Apponiment(req: Request, res: Response) {
  try {
    const {
      username,
      appointment_date,
      appointment_time,
      city,
      phonenumber,
      rolefor,
      barber,
    } = req.body;

    // تحقق من الحقول المطلوبة
    if (
      !username ||
      !appointment_date ||
      !appointment_time ||
      !city ||
      !phonenumber ||
      !rolefor ||
      !barber
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // استدعاء دالة PostgreSQL
    const result = await db.raw(
      `SELECT book_appointment(?, ?, ?, ?, ?, ?, ?) AS message`,
      [
        username,
        appointment_date,
        appointment_time,
        city,
        phonenumber,
        rolefor,
        barber,
      ]
    );

    const message = result.rows[0].message;

    if (message === "Appointment booked successfully.") {
      return res.status(201).json({ message });
    } 
    else 
    {
      return res.status(400).json({ message }); // الرسائل الأخرى مثل التعارض أو موعد في الماضي
    }
  } 
  catch (error: any) 
  {
    console.error("Error booking appointment:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}
