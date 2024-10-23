import React from "react";
import styles from "./styles.module.css";

interface DiagramProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

const Diagram: React.FC<DiagramProps> = ({
  src,
  alt = "Diagram",
  width = 500,
  height = 500,
}) => {
  return (
    <div className={styles.diagramWrapper}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  );
};

export default Diagram;
