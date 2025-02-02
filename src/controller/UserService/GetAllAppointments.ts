import { Request, Response } from 'express';
import { GetAllAppointmentsQuery } from '../../database/querys/User/GetAppointmentsQuery';

export const GetAllAppointments = async (req: Request, res: Response): Promise<Response> => 
    {
    try {
      const user_id = req.query.user_id;
      if(!user_id || typeof user_id !== 'string')
        {
        return res.status(404).send({message:"invalid user_id "})
      }
      const getAllAppointmentsQuery=new GetAllAppointmentsQuery(user_id);
     const  {rows}=await getAllAppointmentsQuery.GetAllAppointments();
     
     const appointments=rows[0].select_all_appointments;

      return  res.status(200).json(appointments);
    } 
    catch (error) 
    {
        return res.status(500).json({ message: 'Error retrieving appointments', error });
    }
};