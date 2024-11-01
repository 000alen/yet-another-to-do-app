import { db } from "@/db";
import { todo } from "@/db/schema";
import { eq, and } from "drizzle-orm";

type Params = Promise<{ orgId: string, todoId: string }>;

export const GET = async (req: Request, { params }: { params: Params }) => {
  const { orgId, todoId } = await params;

  const todos = await db.select().from(todo).where(and(
    eq(todo.organizationId, orgId),
    eq(todo.parentId, todoId)
  ));

  return new Response(JSON.stringify(todos), {
    headers: { "content-type": "application/json" },
  });
}