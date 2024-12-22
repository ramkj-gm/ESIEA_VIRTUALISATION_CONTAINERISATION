import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PWD, DB_NAME } from './env-vars.js'; 

// Create the connection to database
export const connection = await mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PWD,
  database: DB_NAME
});
