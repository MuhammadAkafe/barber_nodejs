import { Request, Response } from 'express';
import { comparePasswords } from '../brcypt/bcryptpasswordHandler';
import { userExistsQuery } from '../../database/querys/UserQuery/UserExistsQuery';
import tokenHandler from '../jwt/jwtTokenHandler';

export async function Login(req: Request, res: Response): Promise<Response> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await userExistsQuery(email); // await here!

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const userData = user.rows[0];
    const isMatch = await comparePasswords(password, userData.password); // likely async

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const { userid: UserID ,phonenumber: Phonenumber, username: UserName } = userData;

    const payload = { UserID, Phonenumber, UserName };
    const TokenHandler = new tokenHandler(payload);

    const access_token = TokenHandler.generateAccessToken();
    const refresh_token = TokenHandler.generateRefreshToken();

    return res.cookie("refreshToken", refresh_token, {
      httpOnly: true,
      secure: true, // true in production
      sameSite: "strict",
      maxAge: 5 * 60 * 1000,
    }).status(200).json({
      message: "Login successful.",
      payload,
      access_token,
    });

  } catch (error: any) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "An internal server error occurred." });
  }
}
