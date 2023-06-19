import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

const FramerCarousel = ({
  children,
  uniqueKey,
  custom,
}: {
  children: React.ReactNode;
  uniqueKey: string | number;
  custom: number;
}) => {
  return (
    <AnimatePresence initial={false} custom={custom}>
      <motion.div
        variants={variants}
        animate="animate"
        initial="initial"
        exit="exit"
        className="absolute inset-0"
        key={uniqueKey}
        custom={custom}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default FramerCarousel;

const variants: Variants = {
  initial: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
    };
  },
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    // transition: 'ease-in',
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.5 },
    },
  },
  exit: (direction: number) => {
    return {
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.5,
      // transition: 'ease-in',
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
      },
    };
  },
};
