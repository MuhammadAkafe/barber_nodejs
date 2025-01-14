import Register from "../controller/Auth/Register";
import Login from "../controller/Auth/login";
import { Router } from "express";


export interface Auth{
     
     initializeRoutes:()=>void
}