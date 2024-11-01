/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as React from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "@/components/toolbar";
import { Todo } from "@/lib/types";
import { ResizeHandle } from "@/components/resize-handle";
import { Context } from "./to-do-page";
import { trpc } from "@/lib/trpc-client";

// Width state and resizing logic
export const MIN_PANEL_WIDTH = 600;
export const MAX_PANEL_WIDTH = 1200;

export const TodoPanel = ({
  todo,
  initialWidth = 600,
}: // onWidthChange,
{
  todo: Todo;
  initialWidth?: number;
  // onWidthChange?: (index: number, width: number) => void;
}) => {
  const { data: children } = trpc.getTodoChildren.useQuery({
    orgId: "",
    todoId: todo.id,
  });

  const { dispatch } = React.useContext(Context)!;

  const [newTodoTitle, setNewTodoTitle] = React.useState("");

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

  // Report width changes to parent
  // React.useEffect(() => {
  //   onWidthChange(index, panelWidth);
  // }, [index, onWidthChange, panelWidth]);

  const addTodo = (parentPath: string[] = []) => {
    // const newTodo: Todo = {
    //   id: Math.random().toString(36).substring(7),
    //   title: newTodoTitle || "New Document",
    //   content: "",
    //   children: [],
    // };
    // setTodos((current) => {
    //   const updated = [...current];
    //   let target = updated;
    //   for (const id of parentPath) {
    //     const parent = target.find((t) => t.id === id);
    //     if (parent) {
    //       target = parent.children;
    //     }
    //   }
    //   target.push(newTodo);
    //   return updated;
    // });
    // setNewTodoTitle("");
    // setActivePath([...parentPath, newTodo.id]);
  };

  const removeTodo = (id: string, parentPath: string[] = []) => {
    // setTodos((current) => {
    //   const updated = [...current];
    //   let target = updated;
    //   for (const pathId of parentPath.slice(0, -1)) {
    //     const parent = target.find((t) => t.id === pathId);
    //     if (parent) {
    //       target = parent.children;
    //     }
    //   }
    //   const index = target.findIndex((t) => t.id === id);
    //   if (index !== -1) {
    //     target.splice(index, 1);
    //   }
    //   return updated;
    // });
    // if (activePath.includes(id)) {
    //   setActivePath(activePath.slice(0, activePath.indexOf(id)));
    // }
  };

  // const isActive =
  //   path.length === activePath.length &&
  //   path.every((id, i) => activePath[i] === id);

  const editor = useEditor({
    extensions: [StarterKit],
    content: todo ? todo.content : "",
    // onUpdate: ({ editor }) => {
    //   if (todo) {
    //     updateTodoContent(todo.id, editor.getHTML(), path.slice(0, -1));
    //   }
    // },
  });

  return (
    <div className="flex h-full">
      <div
        className={cn("h-full flex flex-col bg-white border")}
        style={{ width: `${panelWidth}px` }}
      >
        <Toolbar editor={editor} />

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
          <EditorContent
            editor={editor}
            className="prose max-w-full outline-none"
          />
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Input
                placeholder="New document title"
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
                // onKeyDown={(e) => {
                //   if (e.key === "Enter") {
                //     addTodo(path);
                //   }
                // }}
              />

              <Button
                size="icon"
                // onClick={() => addTodo(path)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-1">
              {children?.map((childTodo) => (
                <Button
                  key={childTodo.id}
                  variant="ghost"
                  className="w-full justify-start font-normal"
                  onClick={() => {
                    dispatch({
                      type: "push",
                      atTodoId: todo.id,
                      todo: childTodo,
                    });
                  }}
                >
                  {childTodo.title}
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
