"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useEditor, EditorContent, Content } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "@/components/toolbar";
import { Todo } from "@/lib/types";
import { ResizeHandle } from "@/components/resize-handle";
import { ChildrenToDoList } from "./children-to-do-list";
import { InlineToDo } from "./inline-to-do";

export const MIN_PANEL_WIDTH = 600;
export const MAX_PANEL_WIDTH = 1200;
export const PLACEHOLDER = "You can take notes here...";

export const TodoPanel = ({
  todo,
  initialWidth = 600,
}: {
  todo: Todo;
  initialWidth?: number;
}) => {
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
    content: todo ? (todo.content as Content) : PLACEHOLDER,
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

        <div className="w-full flex flex-col gap-2 overflow-auto p-4">
          <InlineToDo todo={todo} title />

          <EditorContent editor={editor} className="prose max-w-full" />

          <ChildrenToDoList todoId={todo.id} />
        </div>
      </div>

      <ResizeHandle onResize={handlePanelResize} />
    </div>
  );
};
