/* eslint-disable @typescript-eslint/no-explicit-any */
import { createCallerFactory, router } from "@/trpc/trpc";
import { createContext } from "@/trpc/context";
import authProcedure from "../procedures/auth";
import { z } from "zod";
import { db } from "@/db";
import { and, asc, desc, eq, gt, isNull, ne } from "drizzle-orm";
import { todo } from "@/db/schema";
import { invitation, organization, user } from "@/auth-schema";
import { Invitation } from "@/lib/types";
import { ensureUserIsMember } from "@/lib/auth";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  getTodos: authProcedure.input(z.object({
    orgId: z.string(),
    todoId: z.string().optional()
  })).query(async ({ input: { orgId, todoId }, ctx }) => {
    await ensureUserIsMember(ctx.session.user.id, orgId);

    let data;

    if (todoId) {
      data = await db.select().from(todo).where(and(
        eq(todo.organizationId, orgId),
        eq(todo.parentId, todoId),
        ne(todo.status, "archived")
      )).orderBy(asc(todo.status), desc(todo.updatedAt));
    } else {
      data = await db.select().from(todo).where(and(
        eq(todo.organizationId, orgId),
        isNull(todo.parentId),
        ne(todo.status, "archived")
      )).orderBy(asc(todo.status), desc(todo.updatedAt));
    }

    return data;
  }),

  getArchivedTodos: authProcedure.input(z.object({
    orgId: z.string(),
    todoId: z.string().optional()
  })).query(async ({ input: { orgId, todoId }, ctx }) => {
    await ensureUserIsMember(ctx.session.user.id, orgId);

    let data;

    if (todoId) {
      data = await db.select().from(todo).where(and(
        eq(todo.organizationId, orgId),
        eq(todo.parentId, todoId),
        eq(todo.status, "archived")
      )).orderBy(desc(todo.updatedAt));
    } else {
      data = await db.select().from(todo).where(and(
        eq(todo.organizationId, orgId),
        isNull(todo.parentId),
        eq(todo.status, "archived")
      )).orderBy(desc(todo.updatedAt));
    }
    return data;
  }),

  getTodo: authProcedure.input(z.object({
    orgId: z.string(),
    todoId: z.string()
  })).query(async ({ input: { orgId, todoId }, ctx }) => {
    await ensureUserIsMember(ctx.session.user.id, orgId);

    const [data] = await db.select().from(todo).where(and(
      eq(todo.organizationId, orgId),
      eq(todo.id, todoId)
    )).limit(1);

    if (!data)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Todo not found.",
      });

    return data;
  }),

  createTodo: authProcedure.input(z.object({
    orgId: z.string(),
    todo: z.any()
  })).mutation(async ({ input: { orgId, todo: data }, ctx }) => {
    await ensureUserIsMember(ctx.session.user.id, orgId);

    const newTodo = await db.insert(todo).values({
      ...data,
      createdAt: new Date(),
      organizationId: orgId,
      userId: ctx.session.user.id,
    });

    return newTodo;
  }),

  updateTodo: authProcedure.input(z.object({
    orgId: z.string(),
    todoId: z.string(),
    todo: z.any()
  })).mutation(async ({ input: { orgId, todoId, todo: data }, ctx }) => {
    await ensureUserIsMember(ctx.session.user.id, orgId);

    const updatedTodo = await db.update(todo).set({
      updatedAt: new Date(),
      ...data as any
    }).where(
      and(
        eq(todo.id, todoId),
        eq(todo.organizationId, orgId)
      )
    );

    return updatedTodo;
  }),

  deleteTodo: authProcedure.input(z.object({
    orgId: z.string(),
    todoId: z.string()
  })).mutation(async ({ input: { orgId, todoId }, ctx }) => {
    await ensureUserIsMember(ctx.session.user.id, orgId);
    const deletedTodo = await db.delete(todo).where(and(
      eq(todo.id, todoId),
      eq(todo.organizationId, orgId)
    ));
    return deletedTodo;
  }),

  getInvitations: authProcedure.input(z.object({
    userId: z.string()
  })).output(Invitation.array()).query(async ({
    input: { userId },
    ctx
  }) => {
    if (ctx.session.user.id !== userId) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You can only access your own invitations.",
      });
    }

    const { email } = ctx.session.user;
    const data = await db
      .select({
        id: invitation.id,
        role: invitation.role,
        expiresAt: invitation.expiresAt,
        inviterId: invitation.inviterId,
        inviterName: user.name,
        organizationId: invitation.organizationId,
        organizationName: organization.name
      })
      .from(invitation)
      .leftJoin(organization, eq(organization.id, invitation.organizationId))
      .leftJoin(user, eq(user.id, invitation.inviterId))
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
