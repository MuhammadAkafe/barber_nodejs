import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export default class tokenHandler {
  private readonly accessTokenOptions: SignOptions;
  private readonly refreshTokenOptions: SignOptions;
  private readonly PrivateKey: string;

  constructor() {
    this.accessTokenOptions = { algorithm: "RS256", expiresIn: "5s" };
    this.refreshTokenOptions = { algorithm: "RS256", expiresIn: "5m" };

    // Ensure the keys are properly formatted (replace escaped newlines if present)
    if (!process.env.PRIVATE_KEY || !process.env.PUBLIC_KEY) 
        {
      throw new Error("PRIVATE_KEY or PUBLIC_KEY is not defined in the environment variables.");
    }
    this.PrivateKey = process.env.PRIVATE_KEY
  }

  generateAccessToken(payload: Record<string, string>): string {
    try {
      return jwt.sign(payload, this.PrivateKey, this.accessTokenOptions);
    } 
    catch (error) {
      console.error("Error generating access token:", error);
      throw new Error("Failed to generate access token.");
    }
  }

  generateRefreshToken(payload: Record<string, string>): string {
    try {
      return jwt.sign(payload, this.PrivateKey, this.refreshTokenOptions);
    }
     catch (error:any) {
      console.error("Error generating refresh token:", error.message);
      throw new Error("Failed to generate refresh token.");
    }




  }
}
