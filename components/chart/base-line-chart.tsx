import AnimatedAxis from "@/components/chart/animated-axis";
import AnimatedLine from "@/components/chart/animated-line";
import { MARGIN } from "@/components/chart/defaults";
import { Dataset } from "@/components/chart/types";
import { AxisBottom } from "@visx/axis";
import { Group } from "@visx/group";
import { scaleLinear, scaleTime } from "@visx/scale";
import { extent } from "@visx/vendor/d3-array";
import colors from "tailwindcss/colors";

const BaseLineChart = (props: {
  width: number;
  height: number;
  datasets: Dataset[];
}) => {
  const { width, height, datasets } = props;

  const innerWidth = width - MARGIN.left - MARGIN.right;
  const innerHeight = height - MARGIN.top - MARGIN.bottom;

  const xScale = scaleTime({
    range: [0, innerWidth],
    domain: extent(
      datasets.flatMap((dataset) => dataset.data.map((d) => d.timestamp))
    ) as [Date, Date],
  });

  const yScale = scaleLinear({
    range: [innerHeight, 0],
    domain: extent(
      datasets.flatMap((dataset) => dataset.data.map((d) => d.value))
    ) as [number, number],
  });

  const lines = datasets.map((dataset) => (
    <AnimatedLine
      key={dataset.id}
      data={dataset.data}
      x={(d) => xScale(d.timestamp)}
      y={(d) => yScale(d.value)}
      stroke={dataset.color}
    />
  ));

  return (
    <svg width={width} height={height}>
      <Group left={MARGIN.left} top={MARGIN.top}>
        {lines}
        <AnimatedAxis scale={yScale} width={innerWidth} />
        <AxisBottom
          top={innerHeight}
          scale={xScale}
          hideAxisLine
          hideTicks
          tickLabelProps={{
            fill: colors.neutral["500"],
            fontSize: 12,
          }}
        />
      </Group>
    </svg>
  );
};

export default BaseLineChart;
