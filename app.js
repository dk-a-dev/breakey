import express from 'express';
import { dbConnection } from "./database/dbConnection.js";
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import router from './router/userRouter.js';


const app = express();
dotenv.config({path:"./config/config.env"});

app.use(
    cors({
        origin:process.env.BREAKEY_FRONTEND_URL,
        methods:['GET','POST','PUT','DELETE'],
        credentials:true
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/v1/user",router);

dbConnection();

app.listen(process.env.PORT,()=>{
    console.log(`Server started on port http://localhost:${process.env.PORT}`);
});