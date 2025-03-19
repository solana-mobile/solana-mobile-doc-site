import React, { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface SDKSelectionButtonProps {
  title: string;
  icon: ReactNode;
  link: string;
}

export const SDKSelectionButton: React.FC<SDKSelectionButtonProps> = ({
  title,
  icon,
  link,
}) => {
  return (
    <Link to={link} className={styles.sdkButton}>
      <div className={styles.sdkButtonContent}>
        <div className={styles.sdkButtonIcon}>{icon}</div>
        <div className={styles.sdkButtonTitle}>{title}</div>
      </div>
    </Link>
  );
};

interface SDKSelectionContainerProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

export const SDKSelectionContainer: React.FC<SDKSelectionContainerProps> = ({
  title,
  icon,
  children,
}) => {
  return (
    <div className={styles.sdkContainer}>
      <div className={styles.sdkContainerHeader}>
        <div className={styles.sdkContainerIcon}>{icon}</div>
        <h3 className={styles.sdkContainerTitle}>{title}</h3>
      </div>
      <div className={styles.sdkButtonsGrid}>
        {children}
      </div>
    </div>
  );
};
