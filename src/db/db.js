import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const { Pool } = pg;
// Skapar en ny anslutningspool till PostgreSQL med databasens URL från .env
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Funktion som kör SQL-frågor med parametrar via databaspoolen
export const query = (text, params) => {
  return pool.query(text, params);
};

export default pool;
