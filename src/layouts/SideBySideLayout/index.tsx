import React, { ReactNode } from 'react';
import styles from './styles.module.css';

interface SideBySideLayoutProps {
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  children?: ReactNode;
  reverseMobile?: boolean;
  className?: string;
  gap?: string;
}

const SideBySideLayout: React.FC<SideBySideLayoutProps> = ({
  leftContent,
  rightContent,
  children,
  reverseMobile = false,
  className = '',
  gap = '3rem',
}) => {
  // Use children as leftContent if leftContent is not provided
  const leftContentToRender = leftContent || children;
  
  return (
    <div 
      className={`${styles.container} ${className} ${reverseMobile ? styles.reverseMobile : ''}`}
      style={{ gap }}
    >
      <div className={styles.leftContent}>
        {leftContentToRender}
      </div>
      <div className={styles.rightContent}>
        {rightContent}
      </div>
    </div>
  );
};

export default SideBySideLayout;