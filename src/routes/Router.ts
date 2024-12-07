import express, { Router, Request, Response } from 'express';
import Login from '../controller/Auth/login';
import  hashing  from '../controller/UserService/hashing';
import { authenticateToken } from '../middleWares/authenticateToken';
import AddRole from '../controller/UserService/AddRole';
import EditRole from './../controller/UserService/editRole';
import Register from '../controller/Auth/Register';
class AuthRouter 
{
   router: Router;
   Register: Register;
   login: Login;
   UserService: hashing;
   AddRole:AddRole;
   EditRole:EditRole;

  constructor() 
  {
    this.router = express.Router();
    this.Register = new Register(); 
    this.login = new Login(); 
    this.UserService=new hashing();
    this.AddRole=new AddRole()
    this.EditRole=new EditRole()
    this.AuthController();
    this.UserConrollerService();
  }

  private AuthController() 
  {
    this.router.post('/Register', (req: Request, res: Response) => {this.Register.AddUser(req, res)}); 
    this.router.post('/Login', (req: Request, res: Response) => {this.login.Login(req, res)}); 
  }

  private UserConrollerService()
  {
    this.router.use(authenticateToken)
    this.router.post("/AddRole",(req: Request, res: Response) => {this.AddRole.AddRole(req, res)})
    this.router.patch("/EditRole",(req: Request, res: Response) => {this.EditRole.EditRole(req, res)})
  }


  
  
}

export default AuthRouter;
