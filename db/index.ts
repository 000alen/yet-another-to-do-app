import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "@/db/schema";
import * as authSchema from "../auth-schema";

type Schema = typeof authSchema & typeof schema;

export const db = drizzle<Schema>(process.env.DATABASE_URL!);
