import mysql from 'mysql'
import dotenv from 'dotenv'

dotenv.config()


export default mysql.createConnection({
    user: process.env.USER,
    host : process.env.HOST,
    password : process.env.PASSWORD,
    database : process.env.DATABASE
})