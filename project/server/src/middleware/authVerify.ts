import { NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = 'TRa4sdYR21ES';

const authVerify = async (req: any, res: any, next: NextFunction) => {
  try {
    
    const token = req.headers.authorization.split(" ")[1];
    // const token = req.integrity('authorization')
    if (token) {      
     jwt.verify(token, process.env.SECRET || secret, (err: any, decode: any) => {
        if(err){
          res.json("Invalid Token")
        }else{
          next();
        }
     });
    } else {
      res.status(401).json({error: "Something Went Wrong"})
    }    

  } catch (error) {
    console.log(error);
  }
};

export default authVerify;