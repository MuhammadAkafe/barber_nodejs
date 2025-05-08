import { Request, Response } from "express";
import db from "../../database/pgconnection";

function parseDateTime(dateStr: string, timeStr: string): Date {
    const [day, month, year] = dateStr.trim().split("/").map(Number);
    const [hours, minutes] = timeStr.trim().split(":").map(Number);
    return new Date(year, month - 1, day, hours, minutes);
}

export const Edit_appointment = async (req: Request, res: Response) => {
    try {
        const { appointment_id, appointment_date, appointment_time, rolefor, barber_id } = req.body;

        // 1. Validate required fields
        if (!appointment_id || !appointment_date || !appointment_time || !rolefor || !barber_id) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // 2. Parse and validate appointment date/time
        const selectedDateTime = parseDateTime(appointment_date, appointment_time);
        const now = new Date();
        if (selectedDateTime.getTime() < now.getTime()) 
            {
            return res.status(400).json({ message: "Appointment date/time cannot be in the past." });
            }

        // 3. Check if appointment exists
        const existingAppointment = await db("appointments")
            .where("appointment_id", appointment_id)
            .first();


        if (!existingAppointment) {
            return res.status(404).json({ message: "Appointment not found." });
        }

        // 4. Check if barber exists
        const barber = await db("barbers").where("barber_id", barber_id).first();
        if (!barber) 
            {
            return res.status(404).json({ message: "This barber ID does not exist." });
        }

        // 5. Validate time within working hours
        const openingTime = barber.opening_time; // "08:00"
        const closingTime = barber.closing_time; // "17:00"

        const time = appointment_time.trim();

        if (time < openingTime || time > closingTime) 
            {
            return res.status(400).json({ message: "This appointment is outside the barber's working hours." });
        }

        // 6. Check for conflicting appointment (excluding this one)
        const appointment_conflicting = await db("appointments")
            .where({
                appointment_date,
                appointment_time: time,
                barber_id
            })
            .andWhereNot("appointment_id", appointment_id)
            .first();

        if (appointment_conflicting) 
            {
            return res.status(400).json({ message: "Another appointment already exists at this time." });
        }

        // 7. Update the appointment
        await db("appointments")
            .where("appointment_id", appointment_id)
            .update({
                appointment_date,
                appointment_time: time,
                rolefor,
                barber_id
            });

        return res.status(200).json({ message: "Appointment updated successfully." });

    } 
    catch (error) 
    {
        console.error("Edit Appointment Error:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
