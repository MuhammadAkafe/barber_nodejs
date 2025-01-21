import RegisterForm from "../../interfaces/Register";
import { GlobalQuery } from "./GlobalQuery";


export default class AddUser extends GlobalQuery {
    constructor() {
        super();
    }
    public addUser({username, email, phonenumber, hashedPassword, isAdmin}:RegisterForm): Promise<any> 
    { 
        try {
            const query = `SELECT add_user($1, $2, $3, $4,$5)`;
            return this.query(query, [username, email, phonenumber, hashedPassword, isAdmin]);
        } 
        catch (error: any) 
        {
            console.error(error);
            throw new Error(`Failed to add user: ${error.message}`);
        }

    }
}