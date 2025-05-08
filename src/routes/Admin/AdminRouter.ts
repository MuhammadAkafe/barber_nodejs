import express, { Router, Request, Response } from 'express';
import { add_barber } from '../../controller/Admin/add_barber';
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
        this.router.post('/addbarber',  (req: Request, res: Response) =>{add_barber(req, res)});
    }
}