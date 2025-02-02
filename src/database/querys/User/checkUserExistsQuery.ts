import { GlobalQuery } from "../GlobalQuery";

class CheckUserExistsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "CheckUserExistsError";
    }
}

export class CheckifUserExists extends GlobalQuery 
{
   private Email:string
     constructor(email:string) 
  {
    super();
    this.Email=email
  }
  

  public async userExists(): Promise<any | null> 
  {
    try {
      if(!this.Email) return null;
      const userQuery = `SELECT * FROM users WHERE email = $1`; 
      const user = await this.query(userQuery, [this.Email]);
      return   user.rows.length > 0 ? user : null;
    } 
    catch (error: any) {
      console.error("Error checking if user exists:", error);
      throw new CheckUserExistsError("Error checking if user exists");
    }
  }
}