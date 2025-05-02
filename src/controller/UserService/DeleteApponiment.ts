import { Response, Request } from "express";
import deleteApponiment from "../../database/querys/UserQuery/DeleteApponimentQuery";




    export async function DeleteApponiment(req: Request, res: Response): Promise<Response> 
    {
    try {
      const { user_id, slot_date } = req.body;
      
      // Validate input
      if (!user_id || !slot_date) 
        {
        return res.status(400).json({ message: "UserId and SoltTime are required." });
        }
       const DeleteApponiment = new deleteApponiment({user_id, slot_date });
       DeleteApponiment.deleteApponiment();
      return res.status(200).json({ message: "Appointment successfully deleted." });
      
    } 
    catch (error: any) {
      // Handle errors and provide detailed feedback
      return res.status(500).json({ message: `Error deleting appointment: ${error.message}` });
    }
  }
