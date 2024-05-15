import mysql from "mysql2/promise";
import "dotenv/config";
import { deactivateSchedule } from "../controller/schedule";


const pool = mysql.createPool({
    host:process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    connectionLimit: 20,
    charset:'utf8mb4'
  }) || false ;

if(pool){
  console.log("connected to database");
}

export default pool;