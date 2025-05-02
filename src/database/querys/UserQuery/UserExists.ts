import { globalQuery } from "../GlobalQuery";

class CheckUserExistsError extends Error 
{
    constructor(message: string) {
        super(message);
        this.name = "CheckUserExistsError";
    }
}


 export async function userExists(Email:string): Promise<any | null> 
  {
    try {
      if(!Email) return null;
      const userQuery = `SELECT * FROM users WHERE email = $1`; 
      const user = await globalQuery(userQuery, [Email]);
      return    user.rows.length > 0 ? user : null;
    } 
    catch (error: any) 
    {
      console.error("Error checking if user exists:", error);
      throw new CheckUserExistsError("Error checking if user exists");
    }
  }