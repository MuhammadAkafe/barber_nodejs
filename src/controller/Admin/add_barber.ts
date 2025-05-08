import { Request, Response } from 'express';
import db from '../../database/pgconnection';
import { hashPassword } from '../../brcypt/bcryptpasswordHandler';

export const add_barber = async (req: Request, res: Response) => {
    try {
        const { barber_name, email, password,confirm_password, phonenumber
        ,city, opening_time, closing_time } = req.body;


        // التحقق من المدخلات   
        if (!barber_name || !email || !password || !phonenumber || !city || !opening_time || !closing_time ) 
            {
            return res.status(400).json({ message: "All fields are required" });
            }

        if (password !== confirm_password) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // التحقق إذا كان الحلاق موجودًا بالفعل
        const existingBarber = await db('barbers').where('email', email).first();

        if (existingBarber) {
            return res.status(409).json({ message: "Barber already exists" });
        }



        // تجزئة كلمة المرور
        const hashedPassword = await hashPassword(password);


        // إدخال الحلاق الجديد في قاعدة البيانات
        const [newBarber] = await db('barbers').insert({
            barber_name,
            email,
            password:hashedPassword,
            phonenumber,
            city,
            opening_time,
            closing_time,
        }).returning('*');

        return res.status(201).json({ message: "Barber added successfully", barberId: newBarber.barber_id });
    } 
    catch (error: any) {
        console.error(error);
        return res.status(500).json({ message: `Failed to add barber: ${error.message}` });
    }
}

