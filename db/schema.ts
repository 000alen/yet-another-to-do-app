import {
  pgTable,
  uuid,
  text,
  timestamp,
  jsonb,
  pgEnum,
  integer,
} from "drizzle-orm/pg-core";
import { user, organization } from "../auth-schema";
import { AnyPgColumn } from "drizzle-orm/pg-core";

// Define enums for status and priority
export const todoStatusEnum = pgEnum("todo_status", [
  "open",
  "in_progress",
  "completed",
  "archived",
]);

export const todoPriorityEnum = pgEnum("todo_priority", [
  "low",
  "medium",
  "high",
]);

/**
 * Represents the database schema for a todo item in the application.
 * @table todo
 * @property {UUID} id - Unique identifier for the todo item, auto-generated
 * @property {string} userId - Foreign key reference to the user who created the todo
 * @property {string} [organizationId] - Optional foreign key reference to the organization
 * @property {UUID} [parentId] - Optional self-referential foreign key to parent todo item
 * @property {string} title - The title of the todo item
 * @property {JSON} content - Rich content of the todo item stored as JSONB
 * @property {TodoStatus} status - Current status of the todo item (defaults to "open")
 * @property {Date} [dueAt] - Optional due date and time for the todo item
 * @property {TodoPriority} priority - Priority level of the todo item (defaults to "medium")
 * @property {Date} createdAt - Timestamp of when the todo was created
 * @property {Date} updatedAt - Timestamp of the last update
 * @property {number} version - Version number for optimistic concurrency control (defaults to 1)
 */
export const todo = pgTable("todo", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  organizationId: text("organizationId").references(() => organization.id, {
    onDelete: "cascade",
  }),
  parentId: uuid("parentId")
    .references((): AnyPgColumn => todo.id, {
      onDelete: "cascade",
    }), // Self-referential foreign key
  title: text("title").notNull(),
  content: jsonb("content").notNull(), // Rich content stored as JSONB
  status: todoStatusEnum("status").notNull().default("open"),
  dueAt: timestamp("dueAt"),
  priority: todoPriorityEnum("priority").default("medium"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  version: integer("version").notNull().default(1),
});
