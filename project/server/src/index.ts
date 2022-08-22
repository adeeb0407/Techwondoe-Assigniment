import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/config"
import userRoutes from "./routes/userRoutes"
import reviewsRoutes from "./routes/reviewsRoutes"
import multer from "multer";
import path from 'path';
import { fileURLToPath } from 'url';
import fileUpload from "express-fileupload"

const app = express()
dotenv.config()

app.use(express.json({limit : "30mb"}))
app.use(express.urlencoded({limit: "30mb", extended: true}))
app.use(cors())
app.use(fileUpload())

// const __dirname = path.dirname(__filename);
// app.use('/uploads', express.static(__dirname + "uploads"))

db.connect((err : any) => {
  if(err){
    console.log(err);
  } else{
    console.log(`MYSQL Database connected`);
  }
})

// app.use(MainRouters)
app.use('/', userRoutes)
app.use('/', reviewsRoutes)

app.get("/", (req: Request, res: Response): void => {
  res.json({ message: "TechWondo Server" });
});

app.listen(process.env.PORT, (): void => {
  console.log(`Server Running is http://localhost:${process.env.PORT}`);
});