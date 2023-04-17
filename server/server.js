import express from 'express'
import DBConnect from './config/dbConnect.js';
import Router from './Router/Router.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import path from 'path';
const app=express()
DBConnect()
app.use(
    cors({
        origin: [
            "http://localhost:3000", 
        ],
        credentials: true,
    })
);
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.resolve()+"/public"))


app.use('/',Router)



app.listen(7777,()=>{console.log('port running at 7777')})