import { Request, Response } from "express";
import db from "../../database/pgconnection";

export const delete_appointment = async (req: Request, res: Response) => {
    try {
        const { appointment_id } = req.params;
        if (!appointment_id || isNaN(Number(appointment_id))) 
            {
            return res.status(400).json({ message: "Invalid or missing appointment ID" });
        }

        const appointment = await db("appointments")
            .where("appointment_id", appointment_id)
            .first();

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        await db("appointments")
            .where("appointment_id", appointment_id)
            .del();
            
        return res.status(200).json({ message: "Appointment deleted successfully" });
    } 
    catch (error) 
    {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
