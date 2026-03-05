import React from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  fullScreen?: boolean;
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  color = 'secondary',
  fullScreen = false,
  text,
}) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  const colors = {
    primary: 'border-primary-500',
    secondary: 'border-secondary-500',
    white: 'border-white',
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const LoaderContent = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
        className={`
          ${sizes[size]}
          border-4
          border-t-transparent
          rounded-full
          ${colors[color]}
        `}
      />
      {text && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-${color === 'white' ? 'white' : 'gray-600'} font-medium`}
        >
          {text}
        </motion.p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
      >
        <LoaderContent />
      </motion.div>
    );
  }

  return <LoaderContent />;
};

// Skeleton Loader Component
export const SkeletonLoader: React.FC<{
  count?: number;
  type?: 'card' | 'text' | 'image' | 'avatar';
  className?: string;
}> = ({ count = 1, type = 'text', className = '' }) => {
  const skeletons = Array(count).fill(0);

  const getSkeletonClass = () => {
    switch (type) {
      case 'card':
        return 'h-48 rounded-2xl';
      case 'text':
        return 'h-4 rounded';
      case 'image':
        return 'h-32 rounded-lg';
      case 'avatar':
        return 'w-12 h-12 rounded-full';
      default:
        return 'h-4 rounded';
    }
  };

  return (
    <div className="space-y-3">
      {skeletons.map((_, index) => (
        <motion.div
          key={index}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`bg-gradient-to-r from-gray-200 to-gray-300 ${getSkeletonClass()} ${className}`}
        />
      ))}
    </div>
  );
};

// Page Loader Component
export const PageLoader: React.FC<{ text?: string }> = ({ text = 'Loading...' }) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Loader size="lg" text={text} />
    </div>
  );
};

// Button Loader Component
export const ButtonLoader: React.FC = () => {
  return (
    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

export default Loader;