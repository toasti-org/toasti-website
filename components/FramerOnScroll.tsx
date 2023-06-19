"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import type { Variants } from "framer-motion";

const FramerOnScroll = ({
  children,
  hiddenOpacity,
  hiddenScale,
  visibleOpacity,
  visibleScale,
  duration,
  margin,
  className,
}: {
  children: React.ReactNode;
  hiddenOpacity: number;
  hiddenScale: number;
  visibleOpacity: number;
  visibleScale: number;
  duration: number;
  margin: string;
  className: string;
}) => {
  const control = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: margin,
  });

  // Scroll animation
  useEffect(() => {
    if (isInView) {
      control.start("visible");
    }
  }, [control, isInView]);

  const variants: Variants = {
    visible: {
      opacity: visibleOpacity,
      scale: visibleScale,
      transition: { duration: duration },
    },
    hidden: { opacity: hiddenOpacity, scale: hiddenScale },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={control}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FramerOnScroll;

FramerOnScroll.defaultProps = {
  hiddenOpacity: 0,
  hiddenScale: 0,
  visibleOpacity: 1,
  visibleScale: 1,
  duration: 0.5,
  margin: "20% 0px",
  className: "",
};
