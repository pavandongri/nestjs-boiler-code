import { drizzle } from "drizzle-orm/node-postgres";
import { Pool, type PoolConfig } from "pg";
import * as schema from "./schema";

const poolConfig: PoolConfig = {
  connectionString: process.env.DATABASE_URL
};

const pool = new Pool(poolConfig);

export const db = drizzle(pool, { schema });

export type DB = typeof db;
