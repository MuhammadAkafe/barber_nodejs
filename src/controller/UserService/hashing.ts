import { Response,Request } from "express"
import { QueryService } from "../../database/querys/queryService";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

 const  access_token_key = process.env.PRIVATE_KEY!
 const refresh_token_key = process.env.PUBLIC_KEY!


export default class hashing 
{
    async hashPassword(password: string): Promise<string> {
      return bcrypt.hash(password, 10);
    }
  
    // Compare passwords
     async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
      return bcrypt.compare(password, hashedPassword);
    }
  
    // Generate JWT access token
     generateAccessToken(data:Record<any,string>):string  {
      return jwt.sign({ data }, access_token_key, { algorithm: 'RS256', expiresIn: '70m' });
    }
  
    // Generate JWT refresh token
     generateRefreshToken(email: string): string 
    {
      return jwt.sign({ email }, access_token_key, { algorithm: 'RS256', expiresIn: '7d' });
    }
    

}