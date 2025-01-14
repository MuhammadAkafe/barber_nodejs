import { User } from '../interfaces/User';
import AddRole from '../controller/UserService/AddRole';
import EditRole from '../controller/UserService/editRole';
import DeleteRole from '../controller/UserService/deleteRole';
import express, { Router, Request, Response } from 'express';



export default class  UserRouter implements User  
{
    public router:Router;
    private AddRole:AddRole;
    private EditRole:EditRole;
    private deleteRole:DeleteRole;
    constructor()
    {
        this.router = express.Router();
        this.AddRole = new AddRole();
        this.EditRole = new EditRole();
        this.deleteRole = new DeleteRole();
        this.initializeRoutes();
    }
    initializeRoutes(){
        this.router.post('/AddRole', (req: Request, res: Response) => {this.AddRole.AddRole(req, res)});
        this.router.patch('/EditRole', (req: Request, res: Response) => {this.EditRole.EditRole(req, res)});
        this.router.delete('/DeleteRole', (req: Request, res: Response) => {this.deleteRole.DeleteRole(req, res)});
    }


}