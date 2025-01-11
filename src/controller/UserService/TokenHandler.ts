
import jwt from "jsonwebtoken";


const access_token_key=process.env.PRIVATE_KEY!
const refresh_token_key=process.env.PUBLIC_KEY!
export default class tokenHandler
{
    // Generate JWT access token
    generateAccessToken(data:Record<any,string>):string  {
      return jwt.sign( data , access_token_key, { algorithm: 'RS256', expiresIn: '5s' });
    }
  
    // Generate JWT refresh token
     generateRefreshToken(data:Record<any,string>): string 
    {
      return jwt.sign( data ,refresh_token_key, { algorithm: 'RS256', expiresIn: '1m' });
    }
}