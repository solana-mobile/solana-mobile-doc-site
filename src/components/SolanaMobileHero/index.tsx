import React from "react";
import styles from "./styles.module.css";
import { useColorMode } from "@docusaurus/theme-common";

function SolanaMobileHero({ children }) {
  const { colorMode } = useColorMode();

  // const logoSrc =
  //   colorMode === "dark"
  //     ? "img/Solana_Mobile_With_Logo_White.png"
  //     : "img/Solana_Mobile_With_Logo_Black.png";

  const heroBackgroundSrc = "img/SeekerBannerTransparent.png";

  return (
    <div className={styles.heroContainer}>
      <div
        className={styles.heroBackground}
        style={{ backgroundImage: `url(${heroBackgroundSrc})` }}
      />
      <div className={styles.heroContent}>{children}</div>
    </div>
  );
}

export default SolanaMobileHero;
