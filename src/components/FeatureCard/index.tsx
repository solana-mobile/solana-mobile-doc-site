import React, { ReactNode } from 'react';
import styles from './styles.module.css';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description 
}) => {
  return (
    <div className={styles.featureCard}>
      <div className={styles.cardHeader}>
        <div className={styles.iconContainer}>
          {icon}
        </div>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

interface FeatureCardsProps {
  children: ReactNode;
}

export const FeatureCards: React.FC<FeatureCardsProps> = ({ children }) => {
  return (
    <div className={styles.featureCardsContainer}>
      {children}
    </div>
  );
};