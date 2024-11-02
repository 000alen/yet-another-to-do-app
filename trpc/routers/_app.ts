/* eslint-disable @typescript-eslint/no-explicit-any */
import { createCallerFactory, router } from "@/trpc/trpc";
import { createContext } from "@/trpc/context";
import authProcedure from "../procedures/auth";
import { z } from "zod";
import { db } from "@/db";
import { and, eq, gt, isNull } from "drizzle-orm";
import { todo } from "@/db/schema";
import { invitation } from "@/auth-schema";

export const appRouter = router({
  getTodos: authProcedure.input(z.object({
    orgId: z.string(),
    todoId: z.string().optional()
  })).query(async ({ input: { orgId, todoId } }) => {
    let data;

    if (todoId) {
      data = await db.select().from(todo).where(and(
        eq(todo.organizationId, orgId),
        eq(todo.parentId, todoId)
      ));
    } else {
      data = await db.select().from(todo).where(and(
        eq(todo.organizationId, orgId),
        isNull(todo.parentId)
      ))
    }

    return data;
  }),

  getTodo: authProcedure.input(z.object({
    orgId: z.string(),
    todoId: z.string()
  })).query(async ({ input: { orgId, todoId } }) => {
    const [data] = await db.select().from(todo).where(and(
      eq(todo.organizationId, orgId),
      eq(todo.id, todoId)
    )).limit(1);

    return data;
  }),

  createTodo: authProcedure.input(z.object({
    orgId: z.string(),
    todo: z.any()
  })).mutation(async ({ input: { todo: data } }) => {
    const newTodo = await db.insert(todo).values(data as any);
    return newTodo;
  }),

  updateTodo: authProcedure.input(z.object({
    orgId: z.string(),
    todoId: z.string(),
    todo: z.any()
  })).mutation(async ({ input: { todoId, todo: data } }) => {
    const updatedTodo = await db.update(todo).set(data as any).where(eq(todo.id, todoId));
    return updatedTodo;
  }),

  getInvitations: authProcedure.input(z.object({
    userId: z.string()
  })).query(async ({
    ctx
  }) => {
    const { email } = ctx.session.user;
    const data = await db
      .select()
      .from(invitation)
      .where(
        and(
          gt(invitation.expiresAt, new Date()),
          eq(invitation.status, "pending"),
          eq(invitation.email, email),
        )
      );

    return data;
  })
});


export const createCaller = createCallerFactory(appRouter);

export const createAsyncCaller = async () => {
  const context = await createContext();
  return createCaller(context);
};

export type AppRouter = typeof appRouter;
