import * as React from "react";
import {
  Bold,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Maximize2,
  Minimize2,
  Type,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Toolbar = ({ editor }: { editor: any }) => (
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
