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
     return res.status(400).json({
        message: "Appointment date/time cannot be in the past",
     })
    }

    // 3. Check if the barber exists
    const barber = await db("barbers")
      .where("barber_id", barber_id)
      .first();

    if (!barber) 
      {
     return res.status(404).json({ message: "This barber  does not exist" });
    }

    // 4. Check if the appointment time is within the barber's working hours
    const appointmentTimeOnly = appointment_time.trim();
    const openingTime = barber.opening_time; 
    const closingTime = barber.closing_time; 

    if (appointmentTimeOnly < openingTime || appointmentTimeOnly > closingTime) 
      {
     return  res.status(400).json({
        message: "This appointment is outside the barber's working hours",
      });
      }

    // 5. Check if an exact appointment already exists
    const existing = await db("appointments")
      .where({
        appointment_date,
        appointment_time: appointmentTimeOnly,
        barber_id,
      })
      .first();

      
    if (existing) 
      {
     return res.status(400).json({ message: "Another appointment already exists at this time." });
    }

    // 6. Check for conflicting appointment based on barber's slot time

    const mintesforappointment = barber.minutes_for_appointment;

    // التحقق من أن الوقت المُدخل يقع ضمن فاصل زمني مسموح
    const [_, minute] = appointmentTimeOnly.split(":").map(Number);
    
    if (minute % mintesforappointment !== 0) 
      {
        return res.status(400).
        json({
          message: `Invalid time. Appointment time must be in ${mintesforappointment}-minute intervals (e.g., 18:00, 18:${mintesforappointment}, etc).`
        });
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
