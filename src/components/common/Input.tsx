import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Eye, EyeOff, CheckCircle } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helper?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      success,
      helper,
      leftIcon,
      rightIcon,
      containerClassName = '',
      className = '',
      type = 'text',
      disabled,
      onChange,
      onBlur,
      onFocus,
      onKeyDown,
      onKeyUp,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    const baseStyles = 'w-full rounded-lg transition-all duration-300 outline-none';
    
    const stateStyles = error
      ? 'border-red-500 focus:ring-red-500 bg-red-50'
      : success
      ? 'border-green-500 focus:ring-green-500 bg-green-50'
      : 'border-gray-300 focus:border-secondary-500 focus:ring-secondary-500 bg-white';

    const paddingLeft = leftIcon ? 'pl-12' : 'pl-4';
    const paddingRight = rightIcon || isPassword ? 'pr-12' : 'pr-4';
    const paddingY = 'py-3';

    // Handle focus events
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    // Separate HTML props
    const htmlProps = {
      ref,
      type: inputType,
      disabled,
      onChange,
      onKeyDown,
      onKeyUp,
      onFocus: handleFocus,
      onBlur: handleBlur,
      className: `
        ${baseStyles}
        ${stateStyles}
        ${paddingLeft}
        ${paddingRight}
        ${paddingY}
        ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
        ${className}
      `,
      style: {
        transform: isFocused ? 'scale(1.02)' : 'scale(1)',
        boxShadow: isFocused ? '0 4px 20px rgba(80, 45, 19, 0.1)' : 'none',
        transition: 'transform 0.2s, box-shadow 0.2s'
      } as React.CSSProperties,
      ...props
    };

    return (
      <div className={`w-full ${containerClassName}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}

          {/* Input Field - Use regular input instead of motion.input to avoid type conflicts */}
          <input {...htmlProps} />

          {/* Right Icon / Password Toggle */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            {success && !error && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-green-500"
              >
                <CheckCircle className="w-5 h-5" />
              </motion.div>
            )}

            {rightIcon && !isPassword && (
              <div className="text-gray-400">{rightIcon}</div>
            )}

            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-secondary-500 transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>

        {/* Error / Helper Message */}
        <AnimatePresence mode="wait">
          {(error || helper) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-2"
            >
              {error ? (
                <p className="text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                  {error}
                </p>
              ) : (
                <p className="text-sm text-gray-500">{helper}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;