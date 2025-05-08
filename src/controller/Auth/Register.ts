import { Request, Response } from "express";
import { hashPassword } from "../../brcypt/bcryptpasswordHandler";
import db from "../../database/pgconnection";  // استبدال pgconnection بـ knex

export async function Register(req: Request, res: Response): Promise<Response> {
  try {
    const { username, password, email, confirm_password, phonenumber } = req.body;

    // التحقق من المدخلات
    if (!username || !password || !email || !confirm_password || !phonenumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // تجزئة كلمة المرور
    const hashedPassword = await hashPassword(password);

    // التحقق إذا كان المستخدم موجودًا بالفعل
    const existingUser = await db('users').where('email', email).first();

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    
    // إدخال المستخدم الجديد في قاعدة البيانات
    const [newUser] = await db('users').insert({
      username,
      email,
      password: hashedPassword,
      phonenumber
    }).returning('userid');

    return res.status(201).json({ message: "User added successfully", userId: newUser.userid });

  } catch (error: any) 
  {
    console.error(error);
    return res.status(500).json({ message: `Failed to register user: ${error.message}` });
  }
}
