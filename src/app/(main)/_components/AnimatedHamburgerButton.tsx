import React from "react";
import { MotionConfig, motion } from "motion/react";
import { Button } from "../../../components/ui/button";

interface AnimatedHamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export const AnimatedHamburgerButton: React.FC<
  AnimatedHamburgerButtonProps
> = ({ isOpen, onClick, className = "" }) => {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onClick}
      className={`relative md:hidden ${className}`}
      aria-label="Toggle Menu"
    >
      <MotionConfig
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        <motion.div
          initial={false}
          animate={isOpen ? "open" : "closed"}
          className="relative h-6 w-6"
        >
          <motion.span
            variants={VARIANTS.top}
            className="absolute h-0.5 w-5 bg-current"
            style={{ y: "-50%", left: "50%", x: "-50%", top: "35%" }}
          />
          <motion.span
            variants={VARIANTS.middle}
            className="absolute h-0.5 w-5 bg-current"
            style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
          />
          <motion.span
            variants={VARIANTS.bottom}
            className="absolute h-0.5 w-4 bg-current"
            style={{
              x: "-50%",
              y: "50%",
              bottom: "35%",
              left: "calc(50% + 2px)",
            }}
          />
        </motion.div>
      </MotionConfig>
    </Button>
  );
};

const VARIANTS = {
  top: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      top: ["35%", "50%", "50%"],
      width: ["20px", "20px", "20px"],
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      top: ["50%", "50%", "35%"],
      width: ["20px", "20px", "20px"],
    },
  },
  middle: {
    open: {
      rotate: ["0deg", "0deg", "-45deg"],
      opacity: [1, 1, 1],
    },
    closed: {
      rotate: ["-45deg", "0deg", "0deg"],
      opacity: [1, 1, 1],
    },
  },
  bottom: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      bottom: ["35%", "50%", "50%"],
      left: ["calc(50% + 2px)", "50%", "50%"],
      width: ["16px", "20px", "20px"],
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      bottom: ["50%", "50%", "35%"],
      left: ["50%", "50%", "calc(50% + 2px)"],
      width: ["20px", "20px", "16px"],
    },
  },
};
