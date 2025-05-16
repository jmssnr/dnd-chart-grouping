import { LinePath } from "@visx/shape";
import * as motion from "motion/react-client";

const AnimatedLine = <Datum extends object>(
  props: React.ComponentProps<typeof LinePath<Datum>>
) => {
  const { className, stroke, ...otherProps } = props;
  return (
    <LinePath {...otherProps}>
      {({ path }) => (
        <motion.path
          initial={{
            d: "",
            opacity: 0,
          }}
          animate={{
            d: path(props.data ?? []) || "",
            opacity: 1,
          }}
          fill={"transparent"}
          stroke={stroke}
          className={className}
        />
      )}
    </LinePath>
  );
};

export default AnimatedLine;
