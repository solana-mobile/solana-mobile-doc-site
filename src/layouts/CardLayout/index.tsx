import React, { ReactNode } from "react";
import styles from "./styles.module.css";

interface CardLayoutProps {
  children: ReactNode;
  autoFitEnabled: boolean;
}

const CardLayout: React.FC<CardLayoutProps> = ({ children, autoFitEnabled }) => {
  if (autoFitEnabled) {
    return <section className={styles.cardLayoutAutoFit}>{children}</section>;
  } else {
    return <section className={styles.cardLayoutNormal}>{children}</section>;
  }
};

export default CardLayout;
