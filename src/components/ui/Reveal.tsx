'use client';

import { motion, useReducedMotion } from 'motion/react';
import { fadeUp, stagger, inView } from '@/lib/motion';
import { cn } from '@/lib/utils';

/** Single entrance element: opacity 0->1, y 24->0. */
export function Reveal({
  as = 'div',
  delay = 0,
  className,
  children,
}: {
  as?: 'div' | 'li' | 'article' | 'span';
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      data-reveal=""
      className={className}
      variants={fadeUp}
      transition={{ delay }}
      {...inView}
    >
      {children}
    </MotionTag>
  );
}

/** Parent that staggers Reveal children. */
export function RevealGroup({
  as = 'div',
  staggerChildren = 0.08,
  className,
  children,
}: {
  as?: 'div' | 'ul' | 'ol';
  staggerChildren?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag data-reveal="" className={cn(className)} variants={stagger(staggerChildren)} {...inView}>
      {children}
    </MotionTag>
  );
}

/** Child of RevealGroup — inherits the parent stagger. */
export function RevealItem({
  as = 'div',
  className,
  children,
}: {
  as?: 'div' | 'li' | 'article';
  className?: string;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag data-reveal="" className={className} variants={fadeUp}>
      {children}
    </MotionTag>
  );
}
