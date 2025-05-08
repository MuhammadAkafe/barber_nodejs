import { Request, Response } from "express";
import db from "../../database/pgconnection"; 



export const Getallappointmentsbarber = async (req: Request, res: Response) => {
    try {
        const { barber_id,offset} = req.body;
        if (!barber_id || isNaN(Number(barber_id))) 
            {
            return res.status(400).json({ message: "Invalid or missing user ID" });
        }
        const appointments = await db("appointments")
        .where("barber_id", barber_id)
        .select("*")
        .limit(5)
        .offset(offset)
        .orderBy("appointment_date", "asc")
        .orderBy("appointment_time", "asc");
      
      appointments.forEach(appointment => {
        appointment.appointment_date = appointment.appointment_date.toISOString().split("T")[0];
      });
      
      return res.status(200).json(appointments);
      
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};