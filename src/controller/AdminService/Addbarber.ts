import barber from "../../interfaces/Barber"
import { Request, Response } from 'express';
import { add_barber_query } from "../../database/querys/Admin/AddBarberQuery";
export async function addbarber(req:Request,res:Response) 
{
    try {
       const { email, password, barber,city,phone_number, opening_time, closing_time }:barber = req.body;
        const Add_barber_query=new add_barber_query({email,password,barber,city,phone_number,opening_time,closing_time});
        const result = await Add_barber_query.add_barber();
        return res.status(200).json({message:"barber added successfulhy",result});
    } 
    catch (error:any) 
    {
       return res.status(500).json({message: `${error}`})
    }

}