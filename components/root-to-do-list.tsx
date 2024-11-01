"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Todo } from "@/lib/types";
import { ResizeHandle } from "@/components/resize-handle";
import { MAX_PANEL_WIDTH, MIN_PANEL_WIDTH } from "./to-do-panel";
import { Context } from "./to-do-page";

export const RootToDoList = ({
  todos,
  initialWidth = 600,
}: {
  todos: Todo[];
  initialWidth?: number;
}) => {
  const { dispatch } = React.useContext(Context)!;

  const [panelWidth, setPanelWidth] = React.useState(initialWidth);

  const handlePanelResize = (delta: number) => {
    setPanelWidth((prevWidth) => {
      const newWidth = Math.max(
        MIN_PANEL_WIDTH,
        Math.min(MAX_PANEL_WIDTH, prevWidth + delta)
      );
      return newWidth;
    });
  };

  return (
    <div className="flex h-full">
      <div
        className={cn("h-full flex flex-col bg-white border")}
        style={{ width: `${panelWidth}px` }}
      >
        <div className="flex-1 overflow-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">To do</h2>
          </div>
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Input placeholder="New document title" />

              <Button size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-1">
              {todos.map((todo) => (
                <Button
                  key={todo.id}
                  variant="ghost"
                  className="w-full justify-start font-normal"
                  onClick={() => {
                    dispatch({
                      type: "push",
                      atTodoId: null,
                      todo: todo,
                    });
                  }}
                >
                  {todo.title}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ResizeHandle onResize={handlePanelResize} />
    </div>
  );
};
