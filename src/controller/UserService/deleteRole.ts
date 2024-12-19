import { Response, Request } from "express";
import { QueryService } from "../../database/querys/queryService";

export default class DeleteRole extends QueryService {
  constructor() {
    super();
  }

  public async DeleteRole(req: Request, res: Response): Promise<Response> {
    try {
      const { UserId, SoltTime } = req.body;

      // Validate input
      if (!UserId || !SoltTime) {
        return res.status(400).json({ message: "UserId and SoltTime are required." });
      }

      // Call the database function and get the result
      const query = `SELECT delete_appointment($1, $2) AS success`;
      const result = await this.query(query, [UserId, SoltTime]);

      // Check the result
      const success = result.rows[0]?.success;
      if (!success) {
        return res.status(404).json({ message: "No appointment found to delete." });
      }

      return res.status(200).json({ message: "Appointment successfully deleted." });
      
    } catch (error: any) {
      // Handle errors and provide detailed feedback
      return res.status(500).json({ message: `Error deleting appointment: ${error.message}` });
    }
  }
}
