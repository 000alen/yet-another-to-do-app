"use client";

import * as React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Todo } from "@/lib/types";
import { TodoPanel } from "@/components/to-do-panel";
import { RootToDoList } from "./root-to-do-list";

type PathAction =
  | { type: "push"; atTodoId: string | null; todo: Todo }
  | { type: "pop"; todoId: string };

export const Context = React.createContext<{
  rootTodos: Todo[];
  path: Todo[];
  dispatch: React.Dispatch<PathAction>;
}>({ rootTodos: [], path: [], dispatch: () => {} });

export function ToDoPage({ todos }: { todos: Todo[] }) {
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

  // const [panelWidths, setPanelWidths] = React.useState<number[]>([]);
  // const [leftPadding, setLeftPadding] = React.useState(0);

  // React.useEffect(() => {
  //   const totalPanels = path.length + 1;
  //   setPanelWidths((currentWidths) => {
  //     const newWidths = [...currentWidths];
  //     while (newWidths.length < totalPanels) {
  //       newWidths.push(400); // Default width for new panels
  //     }
  //     return newWidths.slice(0, totalPanels);
  //   });
  // }, [path.length]);

  // // Calculate left padding to center the leftmost panel
  // React.useEffect(() => {
  //   const totalWidth = panelWidths.reduce((a, b) => a + b, 0);
  //   const viewportWidth = window.innerWidth;
  //   if (totalWidth < viewportWidth) {
  //     setLeftPadding((viewportWidth - totalWidth) / 2);
  //   } else {
  //     setLeftPadding(0);
  //   }
  // }, [panelWidths]);

  const context = React.useMemo(
    () => ({ rootTodos: todos, path, dispatch }),
    [todos, path]
  );

  return (
    <Context.Provider value={context}>
      <div className="h-screen p-4 bg-slate-200">
        <ScrollArea className="h-full">
          <div
            className="flex h-full gap-2"
            // style={{
            //   width: `${panelWidths.reduce((a, b) => a + b, 0)}px`,
            //   marginLeft: leftPadding > 0 ? `${leftPadding}px` : "0",
            // }}
          >
            <RootToDoList key="root" todos={todos} />

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
