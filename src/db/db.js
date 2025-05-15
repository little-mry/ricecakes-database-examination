import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import pg from "pg";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const { Pool } = pg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const query = (text, params) => pool.query(text, params);
export default pool;
