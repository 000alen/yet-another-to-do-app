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

// Indexes for performance
// export const todoUserIdIdx = index("todo_user_id_idx").on(todo.userId);
// export const todoOrganizationIdIdx = index("todo_organization_id_idx").on(
//   todo.organizationId
// );
// export const todoParentIdIdx = index("todo_parent_id_idx").on(todo.parentId);
