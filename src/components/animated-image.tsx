// Animated image wrapper that adds subtle motion while respecting reduced-motion preferences.
import { type ImgHTMLAttributes } from "react";
import { motion, useReducedMotion } from "framer-motion";

type AnimatedImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  zoomDuration?: number;
};

export function AnimatedImage({
  zoomDuration = 10,
  className,
  style,
  ...props
}: AnimatedImageProps) {
  // Framer Motion handles the gentle zoom effect and hover scale for hero imagery.
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.img
      {...props}
      className={className}
      style={style}
      animate={
        prefersReducedMotion
          ? undefined
          : {
              scale: [1, 1.035, 1],
            }
      }
      transition={
        prefersReducedMotion
          ? undefined
          : {
              duration: zoomDuration,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
            }
      }
      whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
    />
  );
}
