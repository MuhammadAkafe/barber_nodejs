import { Request, Response } from "express";
import bcryptPasswordHandler from "../brcypt/bcryptpasswordHandler";
import { CheckifUserExists } from "../../database/querys/UserQuery/UserExists";
import AddUser from "../../database/querys/UserQuery/AddUserQuery";
import { RegisterForm } from "../../interfaces/Auth";

export async function addUser(req: Request, res: Response): Promise<Response> {
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
        const passwordHandler = new bcryptPasswordHandler(password);
        const hashedPassword = await passwordHandler.hashPassword();

        // Check if user already exists
        const userExistsQuery = new CheckifUserExists(email);
        const userExists = await userExistsQuery.userExists();
        if (userExists) {
            return res.status(409).json({ message: "User already exists" }); // 409 for conflict
        }
        // Prepare user data and add user
        const register: RegisterForm = { username, email, hashedPassword, phonenumber };
        const addUserQuery = new AddUser(register);
        await addUserQuery.addUser(); // Await the promise to ensure it's executed before proceeding
        return res.status(201).json({ message: "User added successfully" });
    } 
    catch (error: any) {
        if (error.name === "AddUserError") {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: `Failed to register user: ${error.message}` });
    }
}


