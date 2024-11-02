"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEditor, EditorContent, Content } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "@/components/toolbar";
import { Todo } from "@/lib/types";
import { ResizeHandle } from "@/components/resize-handle";
import { Context } from "./to-do-page";
import { ChildrenToDoList } from "./children-to-do-list";

export const MIN_PANEL_WIDTH = 600;
export const MAX_PANEL_WIDTH = 1200;

export const TodoPanel = ({
  todo,
  initialWidth = 600,
}: {
  todo: Todo;
  initialWidth?: number;
}) => {
  const { dispatch } = React.useContext(Context);

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

  const editor = useEditor({
    extensions: [StarterKit],
    content: todo ? (todo.content as Content) : "",
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
  });

  return (
    <div className="flex h-full">
      <div
        className={cn("h-full flex flex-col bg-white border")}
        style={{ width: `${panelWidth}px` }}
      >
        <Toolbar todoId={todo.id} editor={editor} />

        <div className="flex-1 overflow-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{todo.title}</h2>
            <Button
              size="icon"
              variant="ghost"
              onClick={() =>
                dispatch({
                  type: "pop",
                  todoId: todo.id,
                })
              }
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <EditorContent editor={editor} className="prose max-w-full" />

          <ChildrenToDoList todoId={todo.id} />
        </div>
      </div>

      <ResizeHandle onResize={handlePanelResize} />
    </div>
  );
};
