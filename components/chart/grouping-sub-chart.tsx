import BaseLineChart from "@/components/chart/base-line-chart";
import DraggableLegend from "@/components/chart/draggable-legend";
import DroppableContainer from "@/components/chart/droppable-container";
import { Dataset } from "@/components/chart/types";
import { ParentSize } from "@visx/responsive";

const GroupingSubChart = ({
  containerId,
  datasets,
}: {
  containerId: string;
  datasets: Dataset[];
}) => {
  if (datasets.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 min-h-0 h-full w-full border rounded-md shadow-md">
      <DroppableContainer containerId={containerId}>
        {datasets.map((dataset) => (
          <DraggableLegend
            key={`legend-${dataset.id}`}
            legendId={dataset.id}
            label={dataset.label}
            color={dataset.color}
          />
        ))}
      </DroppableContainer>
      <div className="flex-1 min-h-0">
        <ParentSize>
          {({ width, height }) => {
            if (width === 0 || height === 0) return null;

            return (
              <BaseLineChart
                width={width}
                height={height}
                datasets={datasets}
              />
            );
          }}
        </ParentSize>
      </div>
    </div>
  );
};

export default GroupingSubChart;
