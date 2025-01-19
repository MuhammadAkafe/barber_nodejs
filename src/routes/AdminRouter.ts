import { Admin } from "../interfaces/Admin";
import DeleteAllUsers from '../controller/AdminService/deleteallUsers/deleteAllUsers';
import express, { Router, Request, Response } from 'express';
export class AdminRouter implements Admin
{
    private DeleteAllUsers: DeleteAllUsers;
    public router: Router;
    
    constructor(){
        this.router = express.Router();
        this.DeleteAllUsers = new DeleteAllUsers();
    }

    initializeRoutes(){
        this.router.delete('/DeleteAllUsers', (req: Request, res: Response) => {this.DeleteAllUsers.DeleteAllUsers(req, res)});
    }

}