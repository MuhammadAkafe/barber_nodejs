import { Response, Request } from "express";
import AddAppointment from "../../database/querys/UserQuery/AddApponimentQuery";
import { appointmentsdata } from "../../interfaces/RoleData";



export async function Add_Apponiment(req: Request, res: Response): Promise<Response> {
    try {
        const appointmentData = req.body as appointmentsdata ;
        
        const AddApponiment = new AddAppointment(appointmentData);
        await AddApponiment.addAppointment();
        return res.status(200).json({ message: "Appointment successfully booked." });
    } 
    catch (error: any) 
    {
        return res.status(500).json({ message: `Failed to book appointment: ${error.message}` });
    }
}

