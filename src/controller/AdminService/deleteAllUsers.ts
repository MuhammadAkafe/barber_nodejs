import { Response, Request } from "express";
import { QueryService } from "../../database/querys/queryService";
import { json } from "body-parser";


export default class DeleteAllUsers extends QueryService {
  constructor() {
    super();
  }

  public async DeleteAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      // Delete all records from the users table
      const query = `DELETE FROM users`;
      await this.query(query);
      const checkQuery = `SELECT * FROM users`;
      const users = await this.query(checkQuery);
      if(users.rows[0])
        {
        return res.status(401).json({message:"failed to delete users"})
        }

      return res.status(200).json({ message: "All users have been successfully deleted.",users:users.rows });
    } 
    catch (error: any) {
      // Handle errors and provide detailed feedback
      return res.status(500).json({ message: `Error deleting all users: ${error.message}` });
    }
  }
}
