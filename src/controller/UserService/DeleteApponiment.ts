import { Response, Request } from "express";
import deleteApponiment from "../../database/querys/DeleteApponimentQuery";


    export async function DeleteApponiment(req: Request, res: Response): Promise<Response> 
    {
    try {
      const { UserId, SoltTime } = req.body;

      // Validate input
      if (!UserId || !SoltTime) {
        return res.status(400).json({ message: "UserId and SoltTime are required." });
      }
      const DeleteApponiment = new deleteApponiment();
      const result=DeleteApponiment.deleteApponiment(UserId, SoltTime);
      // if (!result.isRoleDeleted) {
      //   return res.status(400).json({ message: "Failed to delete appointment." });
      // }
      // Check the result


      return res.status(200).json({ message: "Appointment successfully deleted." });
      
    } catch (error: any) {
      // Handle errors and provide detailed feedback
      return res.status(500).json({ message: `Error deleting appointment: ${error.message}` });
    }
  }
