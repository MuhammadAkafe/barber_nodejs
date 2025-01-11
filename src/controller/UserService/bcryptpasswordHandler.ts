import { Response,Request } from "express"
import { QueryService } from "../../database/querys/queryService";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();




export default class bcryptpasswordHandler 
{
    async hashPassword(password: string): Promise<string> {
      return bcrypt.hash(password, 10);
    }
  
    // Compare passwords
     async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
      return bcrypt.compare(password, hashedPassword);
    }
  
}

