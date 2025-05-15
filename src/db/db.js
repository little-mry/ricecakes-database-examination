import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import pg from "pg";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const { Pool } = pg;

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: Number(process.env.PGPORT),
});

export const query = (text, params) => pool.query(text, params);
export default pool;
