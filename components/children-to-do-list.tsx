"use client";

import * as React from "react";
import { Archive, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Context } from "./to-do-page";
import { authClient } from "@/lib/auth-client";
import { trpc } from "@/lib/trpc-client";
import { InlineToDo } from "./inline-to-do";
import { InlineToDoMenu } from "./inline-to-do-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Separator } from "./ui/separator";
import { PLACEHOLDER } from "./to-do-panel";

export const ChildrenToDoList = ({ todoId }: { todoId?: string }) => {
  const { orgId } = React.useContext(Context)!;
  const utils = trpc.useUtils();
  const { data: session } = authClient.useSession();
  const { data: todos } = trpc.getTodos.useQuery(
    {
      orgId,
      todoId,
    },
    {
      // queryKey: ["getTodos", { orgId, todoId }],
      placeholderData: [],
    }
  );
  const { data: archivedTodos } = trpc.getArchivedTodos.useQuery(
    {
      orgId,
      todoId,
    },
    {
      // queryKey: ["getTodos", { orgId, todoId }],
      placeholderData: [],
    }
  );
  const { mutateAsync: createTodo } = trpc.createTodo.useMutation();

  const [title, setTitle] = React.useState("");

  const handleCreateTodo = React.useCallback(async () => {
    if (!session) return;

    await createTodo({
      orgId,
      todo: {
        userId: session.user.id,
        organizationId: orgId,
        parentId: todoId ?? null,
        title,
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: PLACEHOLDER }],
            },
          ],
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
    });

    utils.getTodos.invalidate({
      orgId,
      todoId,
    });
  }, [createTodo, orgId, session, title, todoId, utils.getTodos]);

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex items-center gap-2">
        <Input
          placeholder="New to-do"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Button disabled={!title} size="icon" onClick={handleCreateTodo}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {todos?.map((todo) => (
          <div key={todo.id} className="flex justify-between">
            <InlineToDo todo={todo} parentId={todoId} />

            <InlineToDoMenu todo={todo} />
          </div>
        ))}
      </div>

      <Separator />

      <Collapsible>
        <CollapsibleTrigger>
          <Button variant="ghost">
            <Archive className="h-4 w-4" />
            Archived
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-2">
            {archivedTodos?.map((todo) => (
              <InlineToDo key={todo.id} todo={todo} parentId={todoId} />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
