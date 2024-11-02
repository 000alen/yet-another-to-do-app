import * as React from "react";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Todo } from "@/lib/types";
import { trpc } from "@/lib/trpc-client";
import { Context } from "./to-do-page";

export const InlineToDoMenu = ({ todo }: { todo: Todo }) => {
  const { orgId } = React.useContext(Context)!;
  const utils = trpc.useUtils();
  const { mutateAsync: updateTodo } = trpc.updateTodo.useMutation();
  const { mutateAsync: deleteTodo } = trpc.deleteTodo.useMutation();

  const handleArchiveTodo = React.useCallback(
    async (todoId: string) => {
      await updateTodo({
        orgId,
        todoId,
        todo: {
          status: "archived",
        },
      });

      utils.getTodos.invalidate({
        orgId,
        todoId,
      });
      utils.getArchivedTodos.invalidate({
        orgId,
        todoId,
      });
    },
    [orgId, updateTodo, utils.getArchivedTodos, utils.getTodos]
  );

  const handleDeleteTodo = React.useCallback(
    async (todoId: string) => {
      await deleteTodo({
        orgId,
        todoId,
      });

      utils.getTodos.invalidate({
        orgId,
        todoId,
      });
    },
    [deleteTodo, orgId, utils.getTodos]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Ellipsis className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleArchiveTodo(todo.id)}>
            Archive
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => handleDeleteTodo(todo.id)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
