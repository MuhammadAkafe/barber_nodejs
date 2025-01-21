import { Request, Response } from "express";
import {GlobalQuery} from "../../database/querys/GlobalQuery"; // Assuming queryService is your base class for querying the database.
import bcryptPasswordHandler from "../brcypt/bcryptpasswordHandler";
import {CheckifUserExists} from "../../database/querys/checkIfUserExistsQuery";
import AddUser from "../../database/querys/AddUserQuery";


export default class Register extends GlobalQuery {
  private Hashing:bcryptPasswordHandler
  private checkifUserExists: CheckifUserExists;
  private addUser:AddUser
  constructor() {
    super();
     this.Hashing=new bcryptPasswordHandler()
      this.checkifUserExists=new CheckifUserExists()
      this.addUser=new AddUser()
  }
  
  

  public async AddUser(req: Request, res: Response): Promise<Response<Record<string, string>>> {
    try {
      const { username, password, email, confirm_password, phonenumber, isAdmin }= req.body;
  
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
  
      const UserExist=await this.checkifUserExists.userExists(email)
      if (UserExist) 
        { // Assuming the function returns a boolean
        return res.status(409).json({ message: "User already exists"}); // 409 for conflict
      }

      const result=this.addUser.addUser({username, email, phonenumber, hashedPassword, isAdmin});
      if (!result) 
        {
        return res.status(400).json({ message: "Failed to register user" });
      }

      return res.status(201).json({ message: "User added successfully" });
    } 
    catch (error: any)
     {
      return res.status(500).json({ message: `Failed to register user: ${error.message}`});
    }
  }
  


}
