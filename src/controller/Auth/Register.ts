import { Request, Response } from "express";
import {QueryService} from "../../database/querys/queryService"; // Assuming queryService is your base class for querying the database.
import hashing from "../../controller/UserService/hashing";



export default class Register extends QueryService {
  private Hashing:hashing
  constructor() {
    super();
     this.Hashing=new hashing()
  }
  
  

  public async AddUser(req: Request, res: Response): Promise<Response<Record<string, string>>> {
    try {
      const { username, password, email, confirm_password, phonenumber, isAdmin } = req.body;


      // Input validation
      if (!username || !password || !email || !confirm_password || !phonenumber) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Password match validation
      if (password !== confirm_password) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      // Hash the password
      const hashedPassword = await this.Hashing.hashPassword(password);

      // Insert query with hashed password
      const insertQuery = `SELECT Register($1, $2, $3, $4, $5)`;

      await this.query(insertQuery, [username, email, phonenumber, hashedPassword, isAdmin]);

      return res.status(201).json({ message: "User added successfully" });
      
    } catch (error: any) {
      return res.status(500).json({ message: `Failed to register user: ${error.message}` });
    }
  }


}
