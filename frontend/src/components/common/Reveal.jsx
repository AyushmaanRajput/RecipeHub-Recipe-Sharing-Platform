import React from "react";
import styled from "styled-components";
import { motion, useInView, useAnimation } from "framer-motion";

export const Reveal = ({
  children,
  width = "auto",
  delay = 1,
  className = "",
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();
  const slideControls = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    }
  }, [isInView]);

  return (
    <REVEAL ref={ref} width={width} className={className}>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            x: 150,
            y: 150,
          },
          visible: {
            opacity: 1,
            x: 0,
            y: 0,
          },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{
          duration: 0.5,
          delay: delay,
        }}
      >
        {children}
      </motion.div>
    </REVEAL>
  );
};

const REVEAL = styled.div`
  position: relative;
  width: ${(props) => (props.width ? props.width : "100%")};
  /* overflow: hidden; */
`;
