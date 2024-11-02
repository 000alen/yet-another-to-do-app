"use client";

import * as React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Todo } from "@/lib/types";
import { TodoPanel } from "@/components/to-do-panel";
import { RootToDoList } from "./root-to-do-panel";

type PathAction =
  | { type: "push"; atTodoId: string | null; todo: Todo }
  | { type: "pop"; todoId: string };

export const Context = React.createContext<{
  orgId: string;
  path: Todo[];
  dispatch: React.Dispatch<PathAction>;
}>({ orgId: "", path: [], dispatch: () => {} });

export function ToDoPage({ orgId }: { orgId: string }) {
  const [path, dispatch] = React.useReducer(
    (path: Todo[], action: PathAction) => {
      let index;
      switch (action.type) {
        case "push":
          index =
            action.atTodoId === null
              ? 0
              : path.findIndex((t) => t.id === action.atTodoId);
          return [...path.slice(0, index + 1), action.todo];
        case "pop":
          index = path.findIndex((t) => t.id === action.todoId);
          return path.slice(0, index);
        default:
          return path;
      }
    },
    []
  );

  const context = React.useMemo(
    () => ({ orgId, path, dispatch }),
    [orgId, path]
  );

  return (
    <Context.Provider value={context}>
      <div className="h-screen p-4 bg-slate-200">
        <ScrollArea className="h-full">
          <div className="flex h-full gap-2">
            <RootToDoList key="root" />

            {path.map((todo) => (
              <TodoPanel key={todo.id} todo={todo} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </Context.Provider>
  );
}
