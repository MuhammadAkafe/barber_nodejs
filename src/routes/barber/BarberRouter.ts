import express, { Router, Request, Response } from 'express';
import { Getallappointmentsbarber } from '../../controller/barber/get_all_appointment';
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
        this.router.get('/Getallappointmentsbarber',  (req: Request, res: Response) =>{Getallappointmentsbarber(req, res)});

    }
}