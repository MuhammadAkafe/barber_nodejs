import express, { Router, Request, Response } from 'express';
import {Add_Apponiment} from '../controller/UserService/Add_Apponiment';

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
    }
}