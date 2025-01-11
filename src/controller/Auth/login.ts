import { Request, Response } from 'express';
import bcryptpasswordHandler from '../UserService/bcryptpasswordHandler';
import { Querys } from './../../database/querys/querys';
import tokenHandler from '../UserService/TokenHandler';

export default class Login extends tokenHandler {
  private Query: Querys;
  private Hashing:bcryptpasswordHandler
  constructor() {
    super();
    this.Query = new Querys();
    this.Hashing=new bcryptpasswordHandler();
  }

  public async Login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      // Validate request body
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
      }

      // Check if user exists
      const user = await this.Query.userExists(email);
      if (!user || !user.rows[0]) {
        return res.status(401).json({ message: "Invalid credentials." });
      }

      // Compare hashed password
      const hashedPassword = user.rows[0].password;
      const isMatch = await this.Hashing.comparePasswords(password, hashedPassword);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials." });
      }
        const access_token = this.generateAccessToken({id:user.rows[0].id});
        const refresh_token = this.generateRefreshToken({id:user.rows[0].id});

        // Set refresh token as HTTP-only cookie
        return res.cookie("refresh_token", refresh_token, {
          httpOnly: true,
         // secure: process.env.NODE_ENV === "production", // Set to true in production
          sameSite: "strict",
          maxAge: 60 * 1000,
        }).status(200).json({
          message: "Login successful.",
          userID: user.rows[0].id,
          access_token,
        });
    }
     catch (error: any) 
    {
      return res.status(500).json({ message: `An error occurred: ${error.message}` });
    }
  }
}
