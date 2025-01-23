import { Request, Response } from "express";
import {GlobalQuery} from "../../database/querys/GlobalQuery"; // Assuming queryService is your base class for querying the database.
import bcryptPasswordHandler from "../brcypt/bcryptpasswordHandler";
import {CheckifUserExists} from "../../database/querys/checkUserExistsQuery";
import AddUser from "../../database/querys/AddUserQuery";
import { Auth } from "../../interfaces/Auth";



   export async function addUser(req: Request, res: Response): Promise<Response<Record<string, string>>> {
    try {
      const { username, password, email, confirm_password, phonenumber, isAdmin }:Auth= req.body;

      // Input validation
      if (!username || !password || !email || !confirm_password || !phonenumber) {
        return res.status(400).json({ message: "All fields are required"});
      }
  
      // Password match validation
      if (password !== confirm_password) 
        {
        return res.status(400).json({ message: "Passwords do not match" });
      }
  
      // Hash the password
      const Hashing=new bcryptPasswordHandler(password);
      const hashedPassword = await Hashing.hashPassword();
      const UserExists=new CheckifUserExists(email)

      const UserExist=await UserExists.userExists()

      if (UserExist) 
        { // Assuming the function returns a boolean
        return res.status(409).json({ message: "User already exists"}); // 409 for conflict
      }

      
      const register={username, email,hashedPassword,phonenumber, isAdmin};

       const addUser:AddUser=new AddUser(register)
       addUser.addUser();

      return res.status(201).json({ message: "User added successfully" });
    } 
    catch (error: any)
     {
      return res.status(500).json({ message: `Failed to register user: ${error.message}`});
    }
  }
