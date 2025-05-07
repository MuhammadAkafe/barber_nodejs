import { Request, Response } from "express";
import db from "../../database/pgconnection"; 



export const Getallappointments_barber = async (req: Request, res: Response) => {
    try {
        const { barber_id,start_date,end_date } = req.body;
        if (!barber_id || isNaN(Number(barber_id))) 
            {
            return res.status(400).json({ message: "Invalid or missing user ID" });
        }
        const appointments = await db("appointments")
            .where("barber_id", barber_id)
            .select("*");
        return res.status(200).json(appointments);
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};