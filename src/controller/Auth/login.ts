import { Request, Response } from 'express';
import { comparePasswords } from '../../brcypt/bcryptpasswordHandler';
import db from '../../database/pgconnection';
import { generateAccessToken } from '../../jwt/Token';
import { generateRefreshToken } from '../../jwt//Token';
export async function Login(req: Request, res: Response): Promise<Response> {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const userData = await db('users').where('email', email).first();

        if (!userData) {
            return res.status(401).json({ message: "Invalid credentials." });
        }
        
        const isMatch = await comparePasswords(password, userData.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const { userid: UserID, phonenumber: Phonenumber, username: UserName } = userData;

        const payload = { UserID, Phonenumber, UserName };

        const access_token = generateAccessToken(payload);
        const refresh_token = generateRefreshToken(payload);

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

