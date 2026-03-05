import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500 disabled:bg-secondary-300',
    secondary: 'bg-primary-500 text-secondary-500 hover:bg-primary-600 focus:ring-primary-500 disabled:bg-primary-300',
    outline: 'border-2 border-secondary-500 text-secondary-500 hover:bg-secondary-50 focus:ring-secondary-500 disabled:border-secondary-300 disabled:text-secondary-300',
    ghost: 'text-secondary-500 hover:bg-secondary-50 focus:ring-secondary-500 disabled:text-secondary-300',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      className="inline-block"
    >
      <button
        className={`
          ${baseStyles}
          ${variants[variant]}
          ${sizes[size]}
          ${widthClass}
          ${isLoading ? 'cursor-not-allowed opacity-70' : ''}
          ${className}
        `}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
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
            <span>Loading...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
            <span>{children}</span>
            {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
          </div>
        )}
      </button>
    </motion.div>
  );
};

export default Button;