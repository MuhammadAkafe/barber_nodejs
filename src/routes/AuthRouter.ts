import express, { Router, Request, Response } from 'express';
import { Register } from '../controller/Auth/Register';
import { RefreshToken } from '../controller/jwt/Refresh_token';
import { Login } from '../controller/Auth/login';

class AuthRouter {
  public router: Router;
  
  constructor() 
  {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/Register', (req: Request, res: Response) => {Register(req, res)});
    this.router.post('/Login', (req: Request, res: Response) => {Login(req, res)});
    this.router.post('/RefreshToken', (req: Request, res: Response) =>{RefreshToken(req,res)});
  }
}

export default AuthRouter;
