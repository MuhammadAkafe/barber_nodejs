import { Request, Response } from 'express';
import bcryptPasswordHandler from '../brcypt/bcryptpasswordHandler';
import { CheckifUserExists } from '../../database/querys/User/checkUserExistsQuery';
import tokenHandler from '../jwt/jwtTokenHandler';
import { login } from '../../interfaces/Auth';
// 

export async function Login(req: Request, res: Response): Promise<Response> {
  try {
    const { email, password }: login = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const UserExists = new CheckifUserExists(email);
    const user = await UserExists.userExists();

    if (!user || !user.rows[0]) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const hashedPassword = user.rows[0].password;
    const PasswordHandler = new bcryptPasswordHandler(password, hashedPassword);
    const isMatch = await PasswordHandler.comparePasswords();

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const { userid: UserID, isadmin: isAdmin, phonenumber: Phonenumber,username:UserName } = user.rows[0];
    const payload = { UserID, isAdmin, Phonenumber,UserName};
    const TokenHandler = new tokenHandler(payload);
    const access_token = TokenHandler.generateAccessToken();
    const refresh_token = TokenHandler.generateRefreshToken();

    return res.cookie("refreshToken", refresh_token, {
      httpOnly: true,
      secure: true, // Set to true in production
      sameSite: "strict",
      maxAge: 5 * 60 * 1000,
    }).status(200).json(
      {
      message: "Login successful.",
      payload,
      access_token,
    });
  } 
  catch (error: any) {
    return res.status(500).json({ message: "An internal server error occurred." });
  }
}
