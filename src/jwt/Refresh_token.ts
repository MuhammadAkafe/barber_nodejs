import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import TokenHandler from './jwtTokenHandler';

export const RefreshToken = (req: Request, res: Response): Response => 
    {
    try {
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) 
            {
            return res.status(401).json({ message: 'Refresh token not provided' });
            }

        const Public_key = process.env.PUBLIC_KEY;
        if (!Public_key) 
            {
            return res.status(400).json({ message: 'PUBLIC_KEY key is missing' });
        }

        const tokenHandler = new TokenHandler(); // Pass an empty object or appropriate payload

        // Verify the refresh token
     const decoded = tokenHandler.verifyToken(refreshToken);

    if (!decoded || !decoded.id) 
        {
        return res.status(403).json({ message: 'Invalid or expired refreshToken' });
        }

        const newAccessToken = tokenHandler.generateAccessToken();
        return res.json({ accessToken: newAccessToken });
    }
    catch (err) 
    {

        // Handle specific JWT errors
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(403).json({ message: 'Refresh token has expired' });
        }

        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        // Catch-all for other errors
        return res.status(500).json({ message: 'An error occurred while processing the refresh token' });
    }
};