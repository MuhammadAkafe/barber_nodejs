import { Request, Response } from "express";
import {QueryService} from "../../database/querys/queryService"; // Assuming queryService is your base class for querying the database.
import bcryptPasswordHandler from "../UserService/bcryptpasswordHandler";



export default class Register extends QueryService {
  private Hashing:bcryptPasswordHandler
  constructor() {
    super();
     this.Hashing=new bcryptPasswordHandler()
  }
  
  

  public async AddUser(req: Request, res: Response): Promise<Response<Record<string, string>>> {
    try {
      const { username, password, email, confirm_password, phonenumber, isAdmin } = req.body;
  
      // Input validation
      if (!username || !password || !email || !confirm_password || !phonenumber) {
        return res.status(400).json({ message: "All fields are required"});
      }
  
      // Password match validation
      if (password !== confirm_password) {
        return res.status(400).json({ message: "Passwords do not match" });
      }
  
      // Hash the password
      const hashedPassword = await this.Hashing.hashPassword(password);
  
      // Check if the user already exists
      const query = `SELECT check_if_User_exists($1)`;
      const isExists = await this.query(query, [email]);
      if (isExists.rows[0].check_if_user_exists) 
        { // Assuming the function returns a boolean
        return res.status(409).json({ message: "User already exists"}); // 409 for conflict
      }
  
      // Insert the new user
      const insertQuery = `SELECT Register($1, $2, $3, $4, $5)`;
      await this.query(insertQuery, [username, email, phonenumber, hashedPassword, isAdmin]);
      return res.status(201).json({ message: "User added successfully" });
    } 
    catch (error: any)
     {
      return res.status(500).json({ message: `Failed to register user: ${error.message}`});
    }
  }
  


}
