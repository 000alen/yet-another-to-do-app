import { db } from "@/db";
import { todo } from "@/db/schema";
import { and, eq, isNull } from "drizzle-orm";

type Params = Promise<{ orgId: string }>;

export const GET = async (req: Request, { params }: { params: Params }) => {
  const { orgId } = await params;

  const todos = await db.select().from(todo).where(and(
    eq(todo.organizationId, orgId),
    isNull(todo.parentId)
  ))

  return new Response(JSON.stringify(todos), {
    headers: { "content-type": "application/json" },
  });
};

// export const POST = async (req: Request, { params }: { params: Params }) => {
//     const { orgId } = await params;
// };
