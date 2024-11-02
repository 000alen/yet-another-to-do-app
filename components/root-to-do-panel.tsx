"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ResizeHandle } from "@/components/resize-handle";
import { MAX_PANEL_WIDTH, MIN_PANEL_WIDTH } from "./to-do-panel";
import { ChildrenToDoList } from "./children-to-do-list";

export const RootToDoList = ({
  initialWidth = 600,
}: {
  initialWidth?: number;
}) => {
  const [panelWidth, setPanelWidth] = React.useState(initialWidth);

  const handlePanelResize = React.useCallback((delta: number) => {
    setPanelWidth((prevWidth) => {
      const newWidth = Math.max(
        MIN_PANEL_WIDTH,
        Math.min(MAX_PANEL_WIDTH, prevWidth + delta)
      );
      return newWidth;
    });
  }, []);

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

          <ChildrenToDoList />
        </div>
      </div>

      <ResizeHandle onResize={handlePanelResize} />
    </div>
  );
};
