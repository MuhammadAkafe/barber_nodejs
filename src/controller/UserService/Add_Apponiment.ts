import { Response, Request } from "express";
import { addAppointmentQuery } from "../../database/querys/UserQuery/AddApponimentQuery";


export async function Add_Apponiment(req: Request, res: Response): Promise<Response> {
    try {
        const appointmentData = req.body ;
        console.log(appointmentData);
        await addAppointmentQuery(appointmentData);
        return res.status(200).json({ message: "Appointment successfully booked." });
    } 
    catch (error: any) 
    {
        return res.status(500).json({ message: `Failed to book appointment: ${error.message}` });
    }
}

