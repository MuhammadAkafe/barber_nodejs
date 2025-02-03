import express from 'express';
import dotenv from 'dotenv';
import  AuthRouter  from './routes/AuthRouter';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import UserRouter from './routes/UserRouter';
import { AdminRouter } from './routes/AdminRouter';

dotenv.config();




const app = express();
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));


app.use(
    cors({
      origin: 'http://localhost:3000', // Replace with your frontend's origin
      credentials: true, // Allow credentials (cookies)
    })
  );



// Middleware to parse JSON
app.use(express.json());

const authRouter = new AuthRouter();
const userRouter=new UserRouter()
const Adminrouter=new AdminRouter()

app.use(authRouter.router);
app.use(userRouter.router);
app.use(Adminrouter.router);





const port  =process.env.PORT || 5000
app.listen(port, (err?: Error) => {
    if (err) {
        console.log("Error in server setup");
    } else {
        console.log(`Server running at http://localhost:${port}`);
    }
});
