import React, { ReactNode } from "react";
import styles from "./styles.module.css";

interface CardLayoutProps {
  children: ReactNode;
}

const CardLayout: React.FC<CardLayoutProps> = ({ children }) => {
  return <section className={styles.cardLayout}>{children}</section>;
};

export default CardLayout;
