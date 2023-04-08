import React, { ReactNode } from "react";
import styles from "./styles.module.css";

interface SideBySideLayoutProps {
  children: ReactNode;
}

const SideBySideLayout: React.FC<SideBySideLayoutProps> = ({ children }) => {
  return <section className={styles.sideBySideLayout}>{children}</section>;
};

export default SideBySideLayout;
