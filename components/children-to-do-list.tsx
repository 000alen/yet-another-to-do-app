"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Context } from "./to-do-page";
import { authClient } from "@/lib/auth-client";
import { trpc } from "@/lib/trpc-client";

export const ChildrenToDoList = ({ todoId }: { todoId?: string }) => {
  const { orgId, dispatch } = React.useContext(Context)!;
  const utils = trpc.useUtils();
  const { data: session } = authClient.useSession();
  const { data: todos } = trpc.getTodos.useQuery(
    {
      orgId,
      todoId,
    },
    {
      queryKey: ["getTodos", { orgId, todoId }],
      placeholderData: [],
    }
  );
  const { mutateAsync } = trpc.createTodo.useMutation();

  const [title, setTitle] = React.useState("");

  const handleCreateTodo = React.useCallback(async () => {
    if (!session) return;

    await mutateAsync({
      orgId,
      todo: {
        userId: session.user.id,
        organizationId: orgId,
        parentId: todoId ?? null,
        title,
        content: {},
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
    });

    utils.getTodos.invalidate({
      orgId,
      todoId,
    });
  }, [mutateAsync, orgId, session, title, todoId, utils.getTodos]);

  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-4">
        <Input
          placeholder="New to-do"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Button size="icon" onClick={handleCreateTodo}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-1">
        {todos?.map((todo) => (
          <Button
            key={todo.id}
            variant="ghost"
            className="w-full justify-start font-normal"
            onClick={() => {
              dispatch({
                type: "push",
                atTodoId: todoId ?? null,
                todo: todo,
              });
            }}
          >
            {todo.title}
          </Button>
        ))}
      </div>
    </div>
  );
};
