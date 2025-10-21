import chalk from 'chalk';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { info } from 'node:console';
import connectToDB from './database/db.js';
import authRouter from './routes/authRoutes.js';
import taskRouter from './routes/taskRoutes.js';

const { blue } = chalk;

//Dotenv to load environment variables
dotenv.config();
//MongoDB Connection Code
connectToDB();

//Creating the app using express
const app = express();
//Using cors to access from any resource
app.use(cors());
//Middleware to evaluate whether the request is in json format
app.use(express.json());
//PORT
const PORT = process.env.PORT || 3000;

//Setting up session Middleware
if (!process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET is not defined in environment variables');
}
if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in environment variables');
}
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: 'sessions',
    }),
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
      secure: false, // true in production with HTTPS
      httpOnly: true,
    },
  })
);

//routes
app.use('/api/v1/auth/', authRouter);
app.use('/api/v1/tasks/', taskRouter);

//Starting server to listen for requests
app.listen(PORT, () =>
  info(blue(`Server is running successfully on port ${PORT}`))
);
