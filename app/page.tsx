"use client";

import GroupingSubChart from "@/components/chart/grouping-sub-chart";
import Header from "@/components/header";
import { DragDropProvider } from "@dnd-kit/react";
import { cityTemperature } from "@visx/mock-data";
import { useState } from "react";
import colors from "tailwindcss/colors";

export default function Home() {
  const datasets = [
    {
      id: "ny",
      label: "New York",
      color: colors.blue["500"],
      data: cityTemperature.map((d) => ({
        timestamp: new Date(d.date),
        value: parseFloat(d["New York"]),
      })),
    },
    {
      id: "sf",
      label: "San Francisco",
      color: colors.red["500"],
      data: cityTemperature.map((d) => ({
        timestamp: new Date(d.date),
        value: parseFloat(d["San Francisco"]),
      })),
    },
    {
      id: "au",
      label: "Austin",
      color: colors.violet["500"],
      data: cityTemperature.map((d) => ({
        timestamp: new Date(d.date),
        value: parseFloat(d["Austin"]),
      })),
    },
  ];

  const initial = datasets.map((dataset) => ({
    containerId: `container-${dataset.id}`,
    elements: [dataset],
  }));

  const [target, setTarget] = useState(initial);

  const handleRemoveGrouping = () => {
    setTarget(initial);
  };

  const isGrouped = target.some((t) => t.elements.length === 0);

  return (
    <main className="w-screen h-screen flex flex-col gap-6 p-6 overflow-hidden">
      <Header
        isGrouped={isGrouped}
        handleRemoveGrouping={handleRemoveGrouping}
      />
      <DragDropProvider
        onDragEnd={(event) => {
          if (event.canceled) return;

          const sourceId = event.operation.source?.id;
          const targetId = event.operation.target?.id;

          if (sourceId && targetId) {
            const sourceDataset = datasets.find(
              (dataset) => dataset.id === sourceId
            )!;
            const nextTarget = target.map((t) => {
              if (targetId === t.containerId) {
                return {
                  ...t,
                  elements: [
                    ...t.elements.filter((d) => d.id !== sourceId),
                    sourceDataset,
                  ],
                };
              } else {
                return {
                  ...t,
                  elements: t.elements.filter((d) => d.id !== sourceId),
                };
              }
            });
            setTarget(nextTarget);
          }
        }}
      >
        {target.map((t) => (
          <GroupingSubChart
            key={t.containerId}
            containerId={t.containerId}
            datasets={t.elements}
          />
        ))}
      </DragDropProvider>
    </main>
  );
}
