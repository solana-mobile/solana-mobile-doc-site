import React from "react";
import clsx from "clsx";
import { useColorMode } from "@docusaurus/theme-common";
import styles from "./styles.module.css";

const ListingPageSection = ({ title, imageSrc, children, isLast }) => {
  const { colorMode } = useColorMode();

  return (
    <div
      className={clsx(
        styles.container,
        !isLast && styles.withDivider,
        colorMode === "dark" ? styles.darkMode : styles.lightMode
      )}
    >
      <div className={styles.leftHalf}>
        <div className={styles.textContent}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.description}>{children}</div>
        </div>
      </div>
      <div className={styles.rightHalf}>
        <div className={styles.imageContainer}>
          <img src={imageSrc} alt={title} className={styles.image} />
        </div>
      </div>
    </div>
  );
};

export default ListingPageSection;
