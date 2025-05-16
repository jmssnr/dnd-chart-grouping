"use client";

import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/react";

const DroppableContainer = ({
  containerId,
  children,
}: {
  containerId: string | number;
  children: React.ReactNode;
}) => {
  const { ref, droppable } = useDroppable({
    id: containerId,
  });

  return (
    <div
      className={cn(
        "flex gap-2 border border-transparent transition-colors rounded-md p-2",
        droppable.isDropTarget && "border-neutral-500 bg-neutral-100"
      )}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default DroppableContainer;
