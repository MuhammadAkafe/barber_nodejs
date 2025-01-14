import { User } from '../interfaces/User';
import AddRole from '../controller/UserService/AddRole';
import EditRole from '../controller/UserService/editRole';
import DeleteRole from '../controller/UserService/deleteRole';
import express, { Router, Request, Response } from 'express';
import { authenticateToken } from '../controller/jwt/Token';


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
        //this.router.use(authenticateToken);
        this.router.post('/AddRole', (req: Request, res: Response) => {this.AddRole.AddRole(req, res)});
        this.router.patch('/EditRole', (req: Request, res: Response) => {this.EditRole.EditRole(req, res)});
        this.router.delete('/DeleteRole', (req: Request, res: Response) => {this.deleteRole.DeleteRole(req, res)});
        this.router.post('/Home', (req: Request, res: Response):any => {
            const authHeader = req.headers.authorization; // استخراج التوكين من الهيدر
    
            if (!authHeader) {
                return res.status(401).json({ message: "Authorization header is missing" });
            }
    
            const token = authHeader.split(" ")[1]; // استخراج التوكين
            if (!token) {
                return res.status(401).json({ message: "Token is missing" });
            }
    
            return res.status(200).json({ token });
        });
    }


}