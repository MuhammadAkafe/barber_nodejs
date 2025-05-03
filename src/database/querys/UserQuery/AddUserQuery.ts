import { RegisterForm } from "../../../interfaces/Auth";
import { globalQuery } from '../GlobalQuery';



type data = { success: boolean; data?: any; error?: string };

class AddUserError extends Error 
{
    constructor(message: string) {
        super(message);
        this.name = "AddUserError";
    }
}


     export async function addUserQuery({ username, email, hashedPassword, phonenumber }: RegisterForm): Promise<data> {
        const query = `SELECT add_user($1, $2, $3, $4)`;
        try {
            if (!username || !email || !hashedPassword || !phonenumber) {
                throw new Error("All fields are required to create a user.");
            }
    
            username = username.trim();
            email = email.trim();
            phonenumber = phonenumber.trim();
            hashedPassword = hashedPassword.trim();

            const result = await globalQuery(query, [
               username,
                email,
                hashedPassword,
               phonenumber,
            ]);
            return { success: true, data: result };
        } 
        catch (error: any) 
        {
            console.error("Failed to execute addUser query:", error);
            throw new AddUserError(`Failed to add user: ${error.message}`);
        }
    }
