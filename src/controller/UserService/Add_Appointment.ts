import { Request, Response } from "express";
import db from "../../database/pgconnection"; // This should be your Knex instance

function parseDateTime(dateStr: string, timeStr: string): Date {
  const [day, month, year] = dateStr.trim().split("/").map(Number);
  const [hours, minutes] = timeStr.trim().split(":").map(Number);
  return new Date(year, month - 1, day, hours, minutes);
}

export async function Add_Apponiment(req: Request, res: Response) {
  try {
    const {
      userid,
      appointment_date,
      appointment_time,
      city,
      phonenumber,
      rolefor,
      barber_id,
    } = req.body;

    // 1. Validate required fields
    if (
      !userid ||
      !appointment_date ||
      !appointment_time ||
      !city ||
      !phonenumber ||
      !rolefor ||
      !barber_id
    ) 
    {
      return res.status(400).json({ message: "All fields are required" });
    }

    const currentDateTime = new Date();
    const selectedDateTime = parseDateTime(appointment_date, appointment_time);

    // 2. Check if the appointment is not in the past
    if (selectedDateTime < currentDateTime) {
      throw new Error("Appointment date/time cannot be in the past.");
    }

    // 3. Check if the barber exists
    const barber = await db("barbers")
      .where("barber_id", barber_id)
      .first();

    if (!barber) 
      {
      throw new Error("This barber ID does not exist.");
    }

    // 4. Check if the appointment time is within the barber's working hours
    const appointmentTimeOnly = appointment_time.trim();
    const openingTime = barber.opening_time; 
    const closingTime = barber.closing_time; 

    if (appointmentTimeOnly < openingTime || appointmentTimeOnly > closingTime) 
      {
      throw new Error("This appointment is outside the barber's working hours.");
      }

    // 5. Check if an exact appointment already exists
    const existing = await db("appointments")
      .where({
        appointment_date,
        appointment_time: appointmentTimeOnly,
        barber_id,
      })
      .first();

      
    if (existing) {
      throw new Error("This appointment already exists.");
    }

    // 6. Check for conflicting appointment based on barber's slot time
    const minutesForSlot = barber.minutes_for_solt;

    const conflict = await db("appointments")
      .where("appointment_date", appointment_date)
      .andWhere("barber_id", barber_id)
      .andWhereRaw(
        `ABS(EXTRACT(EPOCH FROM (appointment_time::time - ?::time))) < ?`,
        [appointmentTimeOnly, minutesForSlot * 60]
      )
      .first();

    if (conflict) {
      throw new Error(
        `This appointment conflicts with another (less than ${minutesForSlot} minutes apart).`
      );
    }

    // 7. Insert the new appointment
    await db("appointments").insert({
      userid,
      appointment_date,
      appointment_time: appointmentTimeOnly,
      city,
      phonenumber,
      rolefor,
      barber_id,
    });

    return res.status(200).json({ message: "Appointment booked successfully" });

  } 
  catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
