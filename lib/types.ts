import { z } from "zod";

export const Todo = z.object({
  id: z.string(),
  userId: z.string(),
  organizationId: z.string().nullable(),
  parentId: z.string().nullable(),
  title: z.string(),
  content: z.unknown(),
  status: z.enum(["open", "in_progress", "completed", "archived"]),
  dueAt: z.date().nullable(),
  priority: z.enum(["low", "medium", "high"]).nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  version: z.number(),
});

export type Todo = z.infer<typeof Todo>;

export const Invitation = z.object({
  id: z.string(),
  role: z.string().nullable(),
  expiresAt: z.date(),
  inviterId: z.string(),
  inviterName: z.string().nullable(),
  organizationId: z.string(),
  organizationName: z.string().nullable(),
});

export type Invitation = z.infer<typeof Invitation>;