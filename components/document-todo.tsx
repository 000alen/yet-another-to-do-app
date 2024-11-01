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
} | null>(null);

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
    <div
      className={cn(
        "min-w-[400px] max-w-[400px] border-r h-full flex flex-col bg-background",
        !isActive && "opacity-50"
      )}
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
  );
};

export function DocumentTodo() {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [activePath, setActivePath] = React.useState<string[]>([]);

  const getPanels = () => {
    // const panels: JSX.Element[] = [TodoPanel(null, todos, [], true)];
    const panels: JSX.Element[] = [
      <TodoPanel
        key="root"
        todo={null}
        todos={todos}
        path={[]}
        isRoot={true}
      />,
    ];
    let currentTodos = todos;

    for (const id of activePath) {
      const todo = currentTodos.find((t) => t.id === id);
      if (todo) {
        panels.push(
          // TodoPanel(todo, todo.children, activePath.slice(0, panels.length))
          <TodoPanel
            key={todo.id}
            todo={todo}
            todos={todo.children}
            path={activePath.slice(0, panels.length)}
            isRoot={false}
          />
        );
        currentTodos = todo.children;
      }
    }

    return panels;
  };

  return (
    <Context.Provider value={{ todos, setTodos, activePath, setActivePath }}>
      <div className="h-screen">
        <ScrollArea className="h-full whitespace-nowrap">
          <div className="flex h-full justify-start md:justify-center">
            {getPanels()}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </Context.Provider>
  );
}
