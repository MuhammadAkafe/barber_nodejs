import barber from "../../interfaces/Barber"
import { Request, Response } from 'express';

export async function addbarber(req:Request,res:Response) 
{
    try {
        const formdata:barber = req.body as barber;
        return res.status(200).json({formdata:formdata});
    } 
    catch (error:any) 
    {
        const errorMessage = (error as Error).message;
        res.status(500).json({error: ` error form server ${errorMessage}`})
    }

}