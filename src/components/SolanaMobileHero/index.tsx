import React from "react";
import styles from "./styles.module.css";
import { useColorMode } from "@docusaurus/theme-common";

function SolanaMobileHero({ children }) {
  const { colorMode } = useColorMode();

  const heroBackgroundSrc = "img/SeekerGradient.png";

  return (
    <div className={styles.heroContainer}>
      <div
        className={styles.heroBackground}
        style={
          colorMode === "dark"
            ? { backgroundImage: `url(${heroBackgroundSrc})` }
            : {}
        }
      />
      <div className={styles.heroContent}>{children}</div>
    </div>
  );
}

export default SolanaMobileHero;
