import React, { ReactNode } from "react";
import styles from "./styles.module.css";

interface SampleAppCardLayoutProps {
  children: ReactNode;
  autoFitEnabled: boolean;
}

const SampleAppCardLayout: React.FC<SampleAppCardLayoutProps> = ({ children }) => {
    return <section className={styles.cardLayoutNormal}>{children}</section>;
};

export default SampleAppCardLayout;
