import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import AuthRouter from './routes/AuthRouter';
import UserRouter from './routes/UserRouter';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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
app.use(auth_router); // Assuming AuthRouter exposes a `.router` object
app.use(userRouter); // Assuming AuthRouter exposes a `.router` object

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
