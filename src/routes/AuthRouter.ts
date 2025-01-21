import express, { Router, Request, Response } from 'express';
import Login from '../controller/Auth/login';
import { authenticateToken } from '../controller/jwt/Token';
import { RefreshToken } from '../controller/jwt/Refresh_token';
import Register from '../controller/Auth/Register';

class AuthRouter {
  public router: Router;
  private Register: Register;
  private login: Login;

  
  constructor() {
    this.router = express.Router();
    this.Register = new Register();
    this.login = new Login();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/Register', (req: Request, res: Response) => {this.Register.AddUser(req, res)});
    this.router.post('/Login', (req: Request, res: Response) => {this.login.Login(req, res)});
   this.router.post('/RefreshToken', (req: Request, res: Response) =>{RefreshToken(req,res)});
  }
}

export default AuthRouter;
