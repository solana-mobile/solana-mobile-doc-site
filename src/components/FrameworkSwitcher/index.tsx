import React, { useState, ReactNode } from 'react';
import styles from './styles.module.css';

interface FrameworkOption {
  id: string;
  label: string;
  icon?: string;
}

interface FrameworkSwitcherProps {
  frameworks: FrameworkOption[];
  children: Record<string, ReactNode>;
  defaultFramework?: string;
}

export const FrameworkSwitcher: React.FC<FrameworkSwitcherProps> = ({
  frameworks,
  children,
  defaultFramework,
}) => {
  const [activeFramework, setActiveFramework] = useState(
    defaultFramework || frameworks[0]?.id
  );

  return (
    <div className={styles.frameworkSwitcher}>
      <div className={styles.frameworkTabs}>
        {frameworks.map((framework) => (
          <button
            key={framework.id}
            className={`${styles.frameworkTab} ${
              activeFramework === framework.id ? styles.active : ''
            }`}
            onClick={() => setActiveFramework(framework.id)}
          >
            {framework.icon && (
              <img 
                src={framework.icon} 
                alt={framework.label} 
                className={styles.frameworkIcon}
              />
            )}
            {framework.label}
          </button>
        ))}
      </div>
      <div className={styles.frameworkContent}>
        {children[activeFramework]}
      </div>
    </div>
  );
};
