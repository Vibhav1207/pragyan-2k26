import React from 'react';

interface PageTransitionProps {
  targetView: string;
  onComplete: () => void;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ onComplete }) => {
  React.useEffect(() => {
    onComplete();
  }, [onComplete]);

  return null;
};
