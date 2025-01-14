import { GlobalQuery } from "./GlobalQuery";

export class CheckifUserExists extends GlobalQuery {
constructor(){
    super()
}
      public async userExists(email: string) 
      {
        const userQuery = `SELECT * FROM users WHERE email = $1`;  // Adjust as needed for your table structure
        const user = await this.query(userQuery, [email]);
        return user.rows.length > 0 ? user : null;
      }
}