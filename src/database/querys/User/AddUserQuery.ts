import { RegisterForm } from "../../../interfaces/Auth";
import { GlobalQuery } from "../GlobalQuery";

type data = { success: boolean; data?: any; error?: string };

class AddUserError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "AddUserError";
    }
}

export default class AddUser extends GlobalQuery {
    private username: string;
    private email: string;
    private phonenumber: string;
    private hashedPassword: string;

    constructor({ username, email, hashedPassword, phonenumber }: RegisterForm) {
        super();

        // Validate and initialize properties
        if (!username || !email || !hashedPassword || !phonenumber) {
            throw new Error("All fields are required to create a user.");
        }

        this.username = username.trim();
        this.email = email.trim();
        this.phonenumber = phonenumber.trim();
        this.hashedPassword = hashedPassword.trim();
    }

    public async addUser(): Promise<data> {
        const query = `SELECT add_user($1, $2, $3, $4)`;
        try {
            const result = await this.query(query, [
                this.username,
                this.email,
                this.hashedPassword,
                this.phonenumber,
            ]);
            return { success: true, data: result };
        } 
        catch (error: any) {
            console.error("Failed to execute addUser query:", error);
            throw new AddUserError(`Failed to add user: ${error.message}`);
        }
    }
}
