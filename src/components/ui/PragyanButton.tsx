import React from 'react';

interface PragyanButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'red' | 'yellow' | 'black' | 'white' | 'blue';
  icon?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const PragyanButton: React.FC<PragyanButtonProps> = ({
  children,
  variant = 'red',
  icon,
  className = '',
  size = 'md',
  onClick,
  type = 'button',
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'yellow':
        return 'pragyan-button-yellow';
      case 'black':
        return 'pragyan-button-black';
      case 'white':
        return 'pragyan-button-white';
      case 'blue':
        // Map any legacy blue requests to yellow to comply with red/yellow/black/white palette
        return 'pragyan-button-yellow';
      case 'red':
      default:
        return '';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-xs font-bold';
      case 'lg':
        return 'px-8 py-4 text-base font-extrabold';
      case 'md':
      default:
        return 'px-6 py-3 text-sm font-extrabold';
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`pragyan-button ${getVariantClass()} ${getSizeClass()} ${className}`}
      {...props}
    >
      <span className="flex items-center gap-2">
        <span>{children}</span>
        {icon && <span className="inline-flex items-center">{icon}</span>}
      </span>
    </button>
  );
};

export const SpaceButton = PragyanButton;
