import express, { Router, Request, Response } from 'express';
import {Add_Apponiment} from '../controller/UserService/Add_Appointment';
import { delete_appointment } from '../controller/UserService/delete_appointment';
import { Edit_appointment } from '../controller/UserService/edit_Appointment';
import { Get_all_appointments } from '../controller/UserService/Getallappointments';

export default class  UserRouter 
{
    router:Router
    constructor()
    {
        this.router = express.Router();
        this.initializeRoutes();
    }
    initializeRoutes()
    {
        //this.router.use(authenticateToken);
        this.router.post('/AddAppointment',  (req: Request, res: Response) =>{Add_Apponiment(req, res)});
        this.router.get('/GetallAppointments?',  (req: Request, res: Response) =>{Get_all_appointments(req, res)});
        this.router.delete('/DeleteAppointment/:appointment_id',  (req: Request, res: Response) =>{delete_appointment(req, res)});
        this.router.patch('/EditAppointment',  (req: Request, res: Response) =>{Edit_appointment(req, res)});
    }
}