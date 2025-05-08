import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();


    export async function hashPassword(Password:string): Promise<string > 
    {
      return bcrypt.hash(Password, 10);
    }
  
    // Compare passwords
    export async function comparePasswords(Password:string,hashedPassword:string): Promise<boolean> 
    {
        if (!hashedPassword) {
            throw new Error('Hashed password is not provided');
        }
        return bcrypt.compare(Password, hashedPassword);
    }
  

