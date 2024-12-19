import { Response,Request } from "express"
import { QueryService } from "../../database/querys/queryService";

export default class DeleteRole extends QueryService {
    constructor()
    {
        super()
    }
    async DeleteRole(req: Request, res: Response): Promise<Response<any>> {
        try {
          const { UserId, SoltTime} = req.body; 
          // Check if the request body is empty

          console.log(UserId,SoltTime);
          if (!UserId) 
            {
            return res.status(400).json({ message: "No values provided" });
          }
          const query = `SELECT delete_appointment($1,$2)`;
          await this.query(query, [UserId,SoltTime]);
          return res.status(200).json({ message: "Appointment successfully deleted." });
        } 
        catch (error: any)
         {
          // Handle errors and send a failure response
          return res.status(400).json({ message: `Failed to delete appointment: ${error.message}` });
        }
      }

}