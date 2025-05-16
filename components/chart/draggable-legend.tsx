"use client";
import { useDraggable } from "@dnd-kit/react";
import { GripVertical } from "lucide-react";

const DraggableLegend = ({
  legendId,
  color,
  label,
}: {
  legendId: string | number;
  label: string;
  color: string;
}) => {
  const { ref } = useDraggable({
    id: legendId,
  });

  return (
    <div
      ref={ref}
      className="rounded-md shadow-md flex gap-2 p-2 items-center bg-white"
    >
      <div
        className="rounded-full size-4 size-min-4"
        style={{ backgroundColor: color }}
      />
      <p>{label}</p>
      <GripVertical className="size-4 stroke-muted-foreground cursor-grab" />
    </div>
  );
};

export default DraggableLegend;
