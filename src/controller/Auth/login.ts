import { Request, Response } from 'express';
import bcryptPasswordHandler from '../brcypt/bcryptpasswordHandler';
import { CheckifUserExists } from '../../database/querys/checkUserExistsQuery';
import tokenHandler from '../jwt/jwtTokenHandler';
import { Auth } from '../../interfaces/Auth';

type login = Pick<Auth, 'email' | 'password'>;


   export async function Login(req: Request, res: Response): Promise<Response> 
  {
    try {
      const { email, password }:login = req.body;
      if (!email || !password) 
        {
        return res.status(400).json({ message: "Email and password are required." });
        }

      const UserExists=new CheckifUserExists(email)

      // Check if user exists
      const user = await UserExists.userExists();

      if (!user || !user.rows[0]) {
        return res.status(401).json({ message: "Invalid credentials." });
      }

      const hashedPassword = user.rows[0].password;
      const PasswordHandler=new bcryptPasswordHandler(password, hashedPassword)
      
      const isMatch = await PasswordHandler.comparePasswords();
      if (!isMatch) 
        {
        return res.status(401).json({ message: "Invalid credentials." });
      }
      
        const UserID=user.rows[0].userid
        const isAdmin= user.rows[0].isadmin
        const Phonenumber=user.rows[0].phonenumber;


        const payload={UserID:UserID,isAdmin:isAdmin,Phonenumber:Phonenumber}
        const TokenHandler=new tokenHandler(payload)
        const access_token = TokenHandler.generateAccessToken();
        const refresh_token = TokenHandler.generateRefreshToken();

        
        // Set refresh token as HTTP-only cookie
        return res.cookie("refreshToken", refresh_token, {
          httpOnly: true,
         secure: true, // Set to true in production
          sameSite: "strict",
          maxAge: 5*60 * 1000,
        }).status(200).json({
          message: "Login successful.",
          payload:payload,
          access_token,
        });
    }
     catch (error: any) 
    {
      return res.status(500).json({ message: `An error occurred: ${error.message}` });
    }
  }
