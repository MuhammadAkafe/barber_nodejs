import { Request, Response } from "express";
import { RegisterForm } from "../../interfaces/Auth";
import { hashPassword } from "../brcypt/bcryptpasswordHandler";
import { userExistsQuery } from "../../database/querys/UserQuery/UserExistsQuery";
import { addUserQuery } from "../../database/querys/UserQuery/AddUserQuery";

export async function Register(req: Request, res: Response): Promise<Response> {
    try {
        const { username, password, email, confirm_password, phonenumber } = req.body;

        // Input validation
        if (!username || !password || !email || !confirm_password || !phonenumber) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Password match validation
        if (password !== confirm_password) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Check if user already exists
        const UserExists = await userExistsQuery(email);
        if (UserExists) {
            return res.status(409).json({ message: "User already exists" }); // 409 for conflict
        }
        // Prepare user data and add user
        const register: RegisterForm = { username, email, hashedPassword, phonenumber };
        await addUserQuery(register); // Await the promise to ensure it's executed before proceeding
        return res.status(201).json({ message: "User added successfully" });
    } 
    catch (error: any) {
        if (error.name === "AddUserError") {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: `Failed to register user: ${error.message}` });
    }
}


