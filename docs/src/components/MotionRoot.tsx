import { LazyMotion } from 'motion/react';
import type { ReactNode } from 'react';

const loadFeatures = () => import('motion/react').then((mod) => mod.domAnimation);

export const MotionRoot = ({ children }: { children: ReactNode }) => (
  <LazyMotion features={loadFeatures} strict>
    {children}
  </LazyMotion>
);
