import * as React from "react";
import { Todo } from "@/lib/types";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Context } from "./to-do-page";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { trpc } from "@/lib/trpc-client";

export const InlineToDo = ({
  todo,
  parentId,
  title = false,
}: {
  todo: Todo;
  parentId?: string;
  title?: boolean;
}) => {
  const { orgId, dispatch } = React.useContext(Context)!;

  const utils = trpc.useUtils();
  const { mutateAsync } = trpc.updateTodo.useMutation();

  const updateStatus = async (status: string) => {
    await mutateAsync({
      orgId,
      todoId: todo.id,
      todo: {
        status,
      },
    });
    utils.getTodos.invalidate({ orgId });
  };

  const updatePriority = async (priority: string) => {
    await mutateAsync({
      orgId,
      todoId: todo.id,
      todo: {
        priority,
      },
    });
    utils.getTodos.invalidate({ orgId });
  };

  return (
    <div className="flex items-center gap-2">
      {title ? (
        <h2 className="text-xl font-semibold">{todo.title}</h2>
      ) : (
        <Button
          variant="ghost"
          className="font-bold"
          onClick={() => {
            dispatch({
              type: "push",
              atTodoId: parentId ?? null,
              todo: todo,
            });
          }}
        >
          <span>{todo.title}</span>
        </Button>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Badge className="opacity-10 hover:opacity-100 transition-all">
            {todo.status}
          </Badge>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => updateStatus("open")}>
              open
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateStatus("in_progress")}>
              in progress
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateStatus("completed")}>
              completed
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Badge className="opacity-10 hover:opacity-100 transition-all">
            {todo.priority}
          </Badge>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => updatePriority("low")}>
              low
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => updatePriority("medium")}>
              medium
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => updatePriority("high")}>
              high
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
