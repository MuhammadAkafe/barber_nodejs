import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import AuthRouter from './routes/User/AuthRouter';
import UserRouter from './routes/User/UserRouter';
import BarberRouter from './routes/barber/BarberRouter';

dotenv.config();

const app = express();
const Server_PORT = process.env.Server_PORT || 5000;

// Parse cookies
app.use(cookieParser());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies
app.use(express.json());

// Enable CORS for frontend access with credentials (e.g. cookies)
app.use(cors({
  origin: 'http://localhost:3000', // ✅ Replace with your frontend's domain in production
  credentials: true,
}));

// Mount your routers

const auth_router= new AuthRouter().router;
const userRouter=new UserRouter().router;
const barberRouter=new BarberRouter().router; 
app.use(auth_router); 
app.use(userRouter); 
app.use(barberRouter); 

// Start the server
app.listen(Server_PORT, () => {
  console.log(`✅ Server running at http://localhost:${Server_PORT}`);
});
