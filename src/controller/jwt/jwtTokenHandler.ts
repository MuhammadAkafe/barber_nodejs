import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export default class tokenHandler 
{
  private readonly accessTokenOptions: SignOptions;
  private readonly refreshTokenOptions: SignOptions;
  private readonly PRIVATE_KEY: string;
  private readonly PUBLIC_KEY: string;
  private Payload;

  constructor(payload?:Record<any,string>) 
  {
    this.accessTokenOptions = { algorithm: "RS256", expiresIn: "7d" };
    this.refreshTokenOptions = { algorithm: "RS256", expiresIn: "7d" };
    this.Payload=payload
    // Ensure the keys are properly formatted (replace escaped newlines if present)
    if (!process.env.PRIVATE_KEY || !process.env.PUBLIC_KEY) 
        {
      throw new Error("PRIVATE_KEY or PUBLIC_KEY is not defined in the environment variables.");
        }
    this.PRIVATE_KEY = process.env.PRIVATE_KEY as string
    this.PUBLIC_KEY = process.env.PUBLIC_KEY as string
  }

  generateAccessToken(): string | null {
    try {
      if(!this.Payload)
        {
        return null
      }
      return jwt.sign(this.Payload, this.PRIVATE_KEY, this.accessTokenOptions);
    } 
    catch (error) 
    {
      console.error("Error generating access token:", error);
      throw new Error("Failed to generate access token.");
    }
  }

  generateRefreshToken(): string |null
  {
    try {
      if(!this.Payload)
        {
        return null
      }
      return jwt.sign(this.Payload, this.PRIVATE_KEY, this.refreshTokenOptions);
    }
     catch (error:any) 
     {
      console.error("Error generating refresh token:", error.message);
      throw new Error("Failed to generate refresh token.");
      return null 
    }
  }

  verifyToken(token: string): JwtPayload | null 
  {
    try {
     
      const decoded = jwt.verify(token, this.PUBLIC_KEY) as JwtPayload;
      return decoded; 
    } 
    catch (error: any) {
      console.error("Error verifying token:", error.message); 
      return null; 
    }
  }
  
}
