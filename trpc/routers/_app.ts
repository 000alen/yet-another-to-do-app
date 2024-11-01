import { createCallerFactory, router } from "@/trpc/trpc";
import { createContext } from "@/trpc/context";
import authProcedure from "../procedures/auth";
import { z } from "zod";
import { db } from "@/db";
import { and, eq, isNull } from "drizzle-orm";
import { todo } from "@/db/schema";

export const appRouter = router({
  getTodos: authProcedure.input(z.object({
    orgId: z.string()
  })).query(async ({ input: { orgId } }) => {
    const data = await db.select().from(todo).where(and(
      eq(todo.organizationId, orgId),
      isNull(todo.parentId)
    ))

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

  getTodoChildren: authProcedure.input(z.object({
    orgId: z.string(),
    todoId: z.string()
  })).query(async ({ input: { orgId, todoId } }) => {
    const data = await db.select().from(todo).where(and(
      eq(todo.organizationId, orgId),
      eq(todo.parentId, todoId)
    ));

    return data;
  }),

  // createTodo: authProcedure.input(z.object({
  //   orgId: z.string(),
  //   todo: Todo
  // })).mutation(async ({ input: { orgId, todo: data } }) => {
  //   const newTodo = await db.insert(todo).values(data);

  //   return newTodo;
  // })
});


export const createCaller = createCallerFactory(appRouter);

export const createAsyncCaller = async () => {
  const context = await createContext();
  return createCaller(context);
};

export type AppRouter = typeof appRouter;
