import { Response,Request } from "express"
import hashing from "./hashing";
import { QueryService } from "../../database/querys/queryService";

export default class EditRole extends QueryService {
    constructor()
    {
        super()
    }
    async EditRole(req: Request, res: Response): Promise<Response<any>> {
        try {
          const { UserId, RoleFor, SoltTime,Updated_Time } = req.body;
          
          // Check if the request body is empty
          if (!UserId || !RoleFor || !SoltTime ||!Updated_Time ) 
            {
            return res.status(400).json({ message: "No values provided" });
          }
      
          // Split SoltTime to extract the date and time components
          const [CurrentDate, Time] = SoltTime.split(" ");
      
          // Get the current date formatted as DD/MM/YYYY
          const formattedDate = this.getCurrentFormattedDate();
      
          // Validate the provided date
          if (formattedDate !== CurrentDate) {
            return res.status(400).json({ message: "Enter a valid date" });
          }
          
          const query = `SELECT update_appointment($1, $2, $3,$4)`;
          await this.query(query, [UserId, RoleFor, SoltTime,Updated_Time]);
      
          return res.status(200).json({ message: "Appointment successfully updated." });
        } 
        catch (error: any) {
          // Handle errors and send a failure response
          return res.status(400).json({ message: `Failed to update appointment: ${error.message}` });
        }
      }
      public getCurrentFormattedDate(): string 
      {
          const today = new Date();
          const day = String(today.getDate()).padStart(2, '0');
          const month = String(today.getMonth() + 1).padStart(2, '0');
          const year = today.getFullYear();
          return `${day}/${month}/${year}`;
      }

}