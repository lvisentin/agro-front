import { motion } from 'framer-motion';
import { ReactElement } from 'react';
import {
  fadeInTransition,
  fadeInVariants,
} from '../animations/fadeIn.animation';

export interface AnimatedPageProps {
  children: ReactElement;
}

function AnimatedPage({ children }: AnimatedPageProps) {
  return (
    <motion.div
      variants={fadeInVariants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={fadeInTransition}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedPage;
