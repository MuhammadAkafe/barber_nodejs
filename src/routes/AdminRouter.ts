import express, { Router, Request, Response } from 'express';
import { DeleteAllUsers } from '../controller/AdminService/deleteAllUsers';
import { addbarber } from '../controller/AdminService/Addbarber';

export class AdminRouter 
{
    public router: Router;
    constructor(){
        this.router = express.Router();
        this.initializeRoutes();
    }
    initializeRoutes(){
        this.router.delete('/DeleteAllUsers', (req: Request, res: Response) => {DeleteAllUsers(req, res)});
        this.router.post('/Addbarber', (req: Request, res: Response) => {addbarber(req, res)});
    }
}