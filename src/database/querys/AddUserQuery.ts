import { Auth } from "../../interfaces/Auth";
import { GlobalQuery } from "./GlobalQuery";

type RegisterForm = Pick<Auth, 'username' | 'email' | 'phonenumber' | 'hashedPassword' | 'isAdmin'>;

export default class AddUser extends GlobalQuery 
{
    private username
    private email
    private phonenumber
    private hashedPassword
    private isAdmin
    constructor({username, email,hashedPassword,phonenumber, isAdmin}:RegisterForm) 
    {
        super();
        this.username = username;
        this.email = email;
        this.phonenumber = phonenumber;
        this.hashedPassword = hashedPassword;
        this.isAdmin = isAdmin;

    }
    public addUser(): Promise<any> 
    { 
        try {
            const query = `SELECT add_user($1, $2, $3, $4,$5)`;
            return this.query(query, [this.username, this.email, this.hashedPassword, this.phonenumber, this.isAdmin]);
        } 
        catch (error: any) 
        {
            console.error(error);
            throw new Error(`Failed to add user: ${error.message}`);
        }
    }
}