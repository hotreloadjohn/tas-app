import mysql from "mysql2/promise";
import { dbConfig } from "./config/dbConfig.js";

// Create a pool of database connections
export const pool = mysql.createPool(dbConfig);
