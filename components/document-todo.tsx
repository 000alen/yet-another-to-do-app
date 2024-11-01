"use client";

import * as React from "react";
import {
  Bold,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Maximize2,
  Minimize2,
  Plus,
  Type,
  X,
} from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface Todo {
  id: string;
  title: string;
  content: string;
  children: Todo[];
}

const Context = React.createContext<{
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  activePath: string[];
  setActivePath: React.Dispatch<React.SetStateAction<string[]>>;
}>({ todos: [], setTodos: () => {}, activePath: [], setActivePath: () => {} });

const Toolbar = ({ editor }: { editor: any }) => (
  <div className="flex items-center gap-1 px-2 border-b">
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8"
      onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
    >
      <Type className="h-4 w-4" />
    </Button>
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8"
      onClick={() => editor.chain().focus().toggleBold().run()}
    >
      <Bold className="h-4 w-4" />
    </Button>
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8"
      onClick={() => editor.chain().focus().toggleItalic().run()}
    >
      <Italic className="h-4 w-4" />
    </Button>
    <Separator orientation="vertical" className="mx-1 h-6" />
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8"
      onClick={() => editor.chain().focus().toggleBulletList().run()}
    >
      <List className="h-4 w-4" />
    </Button>
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8"
      onClick={() => editor.chain().focus().toggleOrderedList().run()}
    >
      <ListOrdered className="h-4 w-4" />
    </Button>
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8"
      onClick={() => {
        const url = window.prompt("Enter the URL");
        if (url) {
          editor.chain().focus().setLink({ href: url }).run();
        }
      }}
    >
      <LinkIcon className="h-4 w-4" />
    </Button>
    <div className="ml-auto flex items-center gap-1">
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Minimize2 className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Maximize2 className="h-4 w-4" />
      </Button>
    </div>
  </div>
);

const ResizeHandle = ({ onResize }: { onResize: (delta: number) => void }) => {
  const startXRef = React.useRef<number>(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    startXRef.current = e.clientX;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const delta = e.clientX - startXRef.current;
    onResize(delta);
    startXRef.current = e.clientX; // Update the start position
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className="w-2 bg-muted hover:bg-muted-foreground/20 transition-colors cursor-col-resize"
      onMouseDown={handleMouseDown}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-0.5 h-8 bg-muted-foreground/30 rounded-full" />
      </div>
    </div>
  );
};

const TodoPanel = ({
  todo,
  todos,
  path = [],
  isRoot = false,
}: {
  todo: Todo | null;
  todos: Todo[];
  path: string[];
  isRoot: boolean;
}) => {
  const { setTodos, activePath, setActivePath } = React.useContext(Context)!;

  const [newTodoTitle, setNewTodoTitle] = React.useState("");

  // Width state and resizing logic
  const MIN_PANEL_WIDTH = 600;
  const MAX_PANEL_WIDTH = 1000;
  const [panelWidth, setPanelWidth] = React.useState(600);

  const handlePanelResize = (delta: number) => {
    setPanelWidth((prevWidth) => {
      const newWidth = Math.max(
        MIN_PANEL_WIDTH,
        Math.min(MAX_PANEL_WIDTH, prevWidth + delta)
      );
      return newWidth;
    });
  };

  const addTodo = (parentPath: string[] = []) => {
    const newTodo: Todo = {
      id: Math.random().toString(36).substring(7),
      title: newTodoTitle || "New Document",
      content: "",
      children: [],
    };

    setTodos((current) => {
      const updated = [...current];
      let target = updated;

      for (const id of parentPath) {
        const parent = target.find((t) => t.id === id);
        if (parent) {
          target = parent.children;
        }
      }

      target.push(newTodo);
      return updated;
    });

    setNewTodoTitle("");
    setActivePath([...parentPath, newTodo.id]);
  };

  const removeTodo = (id: string, parentPath: string[] = []) => {
    setTodos((current) => {
      const updated = [...current];
      let target = updated;

      for (const pathId of parentPath.slice(0, -1)) {
        const parent = target.find((t) => t.id === pathId);
        if (parent) {
          target = parent.children;
        }
      }

      const index = target.findIndex((t) => t.id === id);
      if (index !== -1) {
        target.splice(index, 1);
      }

      return updated;
    });

    if (activePath.includes(id)) {
      setActivePath(activePath.slice(0, activePath.indexOf(id)));
    }
  };

  const updateTodoContent = (
    id: string,
    content: string,
    parentPath: string[] = []
  ) => {
    setTodos((current) => {
      const updated = [...current];
      let target = updated;

      for (const pathId of parentPath) {
        const parent = target.find((t) => t.id === pathId);
        if (parent) {
          target = parent.children;
        }
      }

      const todo = target.find((t) => t.id === id);
      if (todo) {
        todo.content = content;
      }

      return updated;
    });
  };

  const isActive =
    path.length === activePath.length &&
    path.every((id, i) => activePath[i] === id);

  const editor = useEditor({
    extensions: [StarterKit],
    content: todo ? todo.content : "",
    onUpdate: ({ editor }) => {
      if (todo) {
        updateTodoContent(todo.id, editor.getHTML(), path.slice(0, -1));
      }
    },
  });

  return (
    <div className="flex h-full">
      <div
        className={cn(
          "h-full flex flex-col bg-background border-r",
          !isActive && "opacity-50"
        )}
        style={{ width: `${panelWidth}px` }}
      >
        <Toolbar editor={editor} />

        <div className="flex-1 overflow-auto p-4">
          {todo ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">{todo.title}</h2>
                {!isRoot && (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeTodo(todo.id, path.slice(0, -1))}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <EditorContent editor={editor} className="prose max-w-full" />
            </>
          ) : (
            <div className="text-xl font-semibold mb-4">Todo List</div>
          )}

          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Input
                placeholder="New document title"
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addTodo(path);
                  }
                }}
              />
              <Button size="icon" onClick={() => addTodo(path)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-1">
              {todos.map((childTodo) => (
                <Button
                  key={childTodo.id}
                  variant="ghost"
                  className="w-full justify-start font-normal"
                  onClick={() => setActivePath([...path, childTodo.id])}
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

export function DocumentTodo() {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [activePath, setActivePath] = React.useState<string[]>([]);

  const getPanels = () => {
    const panels: JSX.Element[] = [];
    let currentTodos = todos;

    for (let i = 0; i <= activePath.length; i++) {
      let todo: Todo | null = null;
      let path = activePath.slice(0, i);

      if (i > 0) {
        const id = activePath[i - 1];
        todo = currentTodos.find((t) => t.id === id) || null;
        if (todo) {
          currentTodos = todo.children;
        } else {
          break;
        }
      }

      panels.push(
        <TodoPanel
          key={i === 0 ? "root" : todo?.id || `panel-${i}`}
          todo={i === 0 ? null : todo}
          todos={i === 0 ? todos : todo?.children || []}
          path={path}
          isRoot={i === 0}
        />
      );
    }

    return panels;
  };

  return (
    <Context.Provider value={{ todos, setTodos, activePath, setActivePath }}>
      <div className="h-screen">
        <ScrollArea className="h-full">
          <div className="flex h-full">{getPanels()}</div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </Context.Provider>
  );
}
