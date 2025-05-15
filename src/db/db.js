import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({connectionString: process.env.DATABASE_URL});

// Exportera både poolen och en query-funktion
export const query = (text, params) => {
  return pool.query(text, params);
};

export default pool;
