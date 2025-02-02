import express, { Router, Request, Response } from 'express';
import {Add_Apponiment} from '../controller/UserService/Add_Apponiment';
import { DeleteApponiment } from '../controller/UserService/DeleteApponiment';
import { GetAllAppointments } from '../controller/UserService/GetAllAppointments';

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
        this.router.delete('/DeleteAppointment', (req: Request, res: Response) => {DeleteApponiment(req, res)});
        this.router.get('/GetallAppointments', (req: Request, res: Response) => {GetAllAppointments(req, res)});
    }
}