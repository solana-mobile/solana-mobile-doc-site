import React from "react";
import styles from "./styles.module.css";

interface ImageRowProps {
  children: React.ReactElement | React.ReactElement[];
}

const ImageRow: React.FC<ImageRowProps> = ({ children }) => {
  return (
    <div className={styles.imageRow}>
      {React.Children.map(children, (child) => (
        <div className={styles.imageContainer}>{child}</div>
      ))}
    </div>
  );
};

export default ImageRow;
