import express from 'express';
import dotenv from 'dotenv';
import  AuthRouter  from './routes/Router';
import cors from 'cors'
import cookieParser from 'cookie-parser';
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

const auth = new AuthRouter();

app.use(auth.router);




app.listen(5000, (err?: Error) => {
    if (err) {
        console.log("Error in server setup");
    } else {
        console.log(`Server running at http://localhost:5000`);
    }
});
