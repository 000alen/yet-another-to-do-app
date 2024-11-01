import { db } from "@/db";
import { todo } from "@/db/schema";
import { eq, and } from "drizzle-orm";

type Params = Promise<{ orgId: string, todoId: string }>;

export const GET = async (req: Request, { params }: { params: Params }) => {
  const { orgId, todoId } = await params;

  const [data] = await db.select().from(todo).where(and(
    eq(todo.organizationId, orgId),
    eq(todo.id, todoId)
  )).limit(1);

  return new Response(JSON.stringify(data), {
    headers: { "content-type": "application/json" },
  });
};

// export const PUT = async (req: Request, { params }: { params: Params }) => {
//     const { orgId, todoId } = await params;
// };
