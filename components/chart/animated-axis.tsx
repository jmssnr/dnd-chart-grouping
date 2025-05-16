import { Group } from "@visx/group";
import { ScaleLinear } from "@visx/vendor/d3-scale";
import * as motion from "motion/react-client";

const AnimatedAxis = ({
  scale,
  width,
}: {
  scale: ScaleLinear<number, number>;
  width: number;
}) => {
  return scale.ticks(5).map((tick, i) => (
    <Group key={`tick-${i}`}>
      <text y={scale(tick) - 5} className="text-xs fill-muted-foreground">
        {tick}
      </text>
      <motion.line
        x1={0}
        x2={width}
        animate={{ y1: scale(tick), y2: scale(tick) }}
        className="stroke-neutral-200"
        strokeDasharray="5,10"
      />
    </Group>
  ));
};

export default AnimatedAxis;
