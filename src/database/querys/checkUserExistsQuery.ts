
import { GlobalQuery } from "./GlobalQuery";
import { Request,Response } from "express";
export class CheckifUserExists extends GlobalQuery 
{
   private Email
  constructor(email:string) {
    super();
    this.Email=email
   
  }

  public async userExists(): Promise<any | null> 
  {
    try {
      const userQuery = `SELECT * FROM users WHERE email = $1`; // Adjust as needed for your table structure
      const user = await this.query(userQuery, [this.Email]);
      return user.rows.length > 0 ? user : null;
    } 
    catch (error) {
      console.error("Error checking if user exists:", error);
      throw new Error("Error checking if user exists");
    }
  }
}