import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<"div"> {
  variant?: 'default' | 'elevated' | 'outlined' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  clickable?: boolean;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  clickable = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-2xl transition-all duration-300';
  
  const variants = {
    default: 'bg-white shadow-md',
    elevated: 'bg-white shadow-xl hover:shadow-2xl',
    outlined: 'bg-white border-2 border-primary-200',
    flat: 'bg-primary-50',
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverStyles = hoverable ? 'hover:shadow-xl hover:-translate-y-1' : '';
  const clickableStyles = clickable ? 'cursor-pointer hover:ring-2 hover:ring-secondary-500' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={clickable ? { scale: 1.02 } : hoverable ? { y: -5 } : {}}
      whileTap={clickable ? { scale: 0.98 } : {}}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${paddings[padding]}
        ${hoverStyles}
        ${clickableStyles}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Sub-components for Card
export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={`border-b border-primary-100 pb-4 mb-4 ${className}`}>
    {children}
  </div>
);

export const CardBody: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <div className={className}>{children}</div>;

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={`border-t border-primary-100 pt-4 mt-4 ${className}`}>
    {children}
  </div>
);

export default Card;