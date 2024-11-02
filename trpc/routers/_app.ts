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

/**
 * Application router for handling todo and invitation related operations.
 * @module appRouter
 * 
 * @typedef {Object} Router
 * @property {Procedure} getTodos - Retrieves todos based on organization ID and optional parent todo ID
 * @property {Procedure} getArchivedTodos - Retrieves archived todos based on organization ID and optional parent todo ID
 * @property {Procedure} getTodo - Retrieves a specific todo by ID
 * @property {Procedure} createTodo - Creates a new todo in the specified organization
 * @property {Procedure} updateTodo - Updates an existing todo
 * @property {Procedure} deleteTodo - Deletes a todo from the database
 * @property {Procedure} getInvitations - Retrieves pending invitations for a user
 * 
 * @description
 * This router provides authenticated procedures for managing todos and organization invitations.
 * All procedures require authentication and verify user membership in the organization.
 * 
 * Todo operations include:
 * - Fetching active and archived todos (with optional parent-child relationship)
 * - Creating, updating, and deleting todos
 * - Managing todo status and hierarchy
 * 
 * Invitation operations include:
 * - Fetching pending invitations for the authenticated user
 * - Validating invitation expiration and status
 * 
 * @security
 * - All procedures require authentication via authProcedure
 * - Organization membership is verified using ensureUserIsMember
 * - Invitation access is restricted to the owner
 * 
 * @throws {TRPCError}
 * - NOT_FOUND: When requested todo doesn't exist
 * - FORBIDDEN: When attempting to access unauthorized invitations
 */
export const appRouter = router({
  // Get active todos for an organization, optionally filtered by parent todo
  getTodos: authProcedure.input(z.object({
    orgId: z.string(),
    todoId: z.string().optional()
  })).query(async ({ input: { orgId, todoId }, ctx }) => {
    await ensureUserIsMember(ctx.session.user.id, orgId);

    let data;

    if (todoId) {
      // Get child todos for a specific parent
      data = await db.select().from(todo).where(and(
        eq(todo.organizationId, orgId),
        eq(todo.parentId, todoId),
        ne(todo.status, "archived")
      )).orderBy(asc(todo.status), desc(todo.updatedAt));
    } else {
      // Get root-level todos
      data = await db.select().from(todo).where(and(
        eq(todo.organizationId, orgId),
        isNull(todo.parentId),
        ne(todo.status, "archived")
      )).orderBy(asc(todo.status), desc(todo.updatedAt));
    }

    return data;
  }),

  // Get archived todos for an organization, optionally filtered by parent todo
  getArchivedTodos: authProcedure.input(z.object({
    orgId: z.string(),
    todoId: z.string().optional()
  })).query(async ({ input: { orgId, todoId }, ctx }) => {
    await ensureUserIsMember(ctx.session.user.id, orgId);

    let data;

    if (todoId) {
      // Get archived child todos
      data = await db.select().from(todo).where(and(
        eq(todo.organizationId, orgId),
        eq(todo.parentId, todoId),
        eq(todo.status, "archived")
      )).orderBy(desc(todo.updatedAt));
    } else {
      // Get root-level archived todos
      data = await db.select().from(todo).where(and(
        eq(todo.organizationId, orgId),
        isNull(todo.parentId),
        eq(todo.status, "archived")
      )).orderBy(desc(todo.updatedAt));
    }
    return data;
  }),

  // Get a specific todo by ID
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

  // Create a new todo in the organization
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

  // Update an existing todo
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

  // Delete a todo from the database
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

  // Get pending invitations for a user
  getInvitations: authProcedure.input(z.object({
    userId: z.string()
  })).output(Invitation.array()).query(async ({
    input: { userId },
    ctx
  }) => {
    // Verify user is accessing their own invitations
    if (ctx.session.user.id !== userId) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You can only access your own invitations.",
      });
    }

    const { email } = ctx.session.user;
    // Fetch active invitations with organization and inviter details
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
