import * as React from "react";

export const ResizeHandle = ({
  onResize,
}: {
  onResize: (delta: number) => void;
}) => {
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
