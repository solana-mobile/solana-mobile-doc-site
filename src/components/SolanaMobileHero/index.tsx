import React from "react";
import styles from "./styles.module.css";

function SolanaMobileHero({ children }) {
  return (
    <div className={styles.heroContainer}>
      <div
        className={styles.heroBackground}
      />
      <div className={styles.heroContent}>{children}</div>
    </div>
  );
}

export default SolanaMobileHero;
