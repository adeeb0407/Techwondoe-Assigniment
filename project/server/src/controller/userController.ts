import mysql from 'mysql';
import express, {Request, Response} from 'express';
import db from '../config/config';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()


const secret = 'TRa4sdYR21ES';

export const getUsers = ((req: Request, res: Response) => {
    
        db.query('SELECT * from users', (err: any, result: any) =>{
            if(err){
                console.log(err);
            }
            res.send(result);
        });
        db.end()
    
});
export const login = ((req: Request, res: Response) => {

        const {username, password} = req.body

        try {
            db.query('SELECT * from users WHERE username = ?',[username], (err: any, result: any) =>{
                if(err){
                    console.log(err);
                }else{
                    if(result.length == 0){
                        res.json("User Does not Exist");
                    }else{
                        if(result[0]?.password !== password){
                            res.json("Incorrect Password");
                        }else{
    
                            const token = jwt.sign({ email: result[0]?.username}, process.env.SECRET || secret, { expiresIn: "2h" });
                            res.status(200).json({ username: result[0]?.username, user_id : result[0]?.user_id, token });
                            
                        }
                    }
            db.end()
                }
                
            });
        } catch (error) {
            console.log(error)
        }
    
});


