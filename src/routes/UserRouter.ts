import { User } from '../interfaces/User';
import express, { Router, Request, Response } from 'express';
import {Add_Apponiment} from '../controller/UserService/Add_Apponiment';
import { EditApponiment } from '../controller/UserService/EditApponiment';
import { DeleteApponiment } from '../controller/UserService/DeleteApponiment';


export default class  UserRouter implements User  
{
    router:Router
    constructor()
    {
        this.router = express.Router();
        this.initializeRoutes();
    }
    initializeRoutes(){
        //this.router.use(authenticateToken);
        this.router.post('/AddApponiment',  (req: Request, res: Response) =>{Add_Apponiment(req, res)});
        this.router.patch('/EditApponiment', (req: Request, res: Response) => {EditApponiment(req, res)});
        this.router.delete('/DeleteApponiment', (req: Request, res: Response) => {DeleteApponiment(req, res)});
    }
}