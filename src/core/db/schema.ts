import {
  bigint,
  boolean,
  date,
  index,
  integer,
  json,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid
} from "drizzle-orm/pg-core";

// Payroll Providers
export const PayrollProviders = pgTable("PayrollProviders", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").unique().notNull(),
  shortId: text("shortId").unique().notNull(),
  logoUrl: text("logoUrl"),
  key: text("key"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  deletedAt: timestamp("deletedAt")
});
