import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
import Translate from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";

interface CardProps {
  header: {
    label: string;
    translateId: string;
  };
  body: {
    label: string;
    translateId: string;
  };
  to: string;
  iconPath?: string;
  emoji?: string;
  iconComponent?: React.ReactNode; // New prop for passing a React component directly
}

const Card: React.FC<CardProps> = ({ 
  header, 
  body, 
  to, 
  iconPath, 
  emoji, 
  iconComponent 
}) => {
  return (
    <div className={styles.cardContainer}>
      <Link className={styles.cardLink} to={to}>
        <div className={styles.cardContent}>
          <div className={styles.iconWrapper}>
            {iconComponent ? (
              <div className={styles.cardIcon}>{iconComponent}</div>
            ) : emoji ? (
              <div className={styles.emojiIcon}>{emoji}</div>
            ) : (
              iconPath && (
                <img
                  src={useBaseUrl(iconPath)}
                  alt=""
                  className={styles.cardIcon}
                />
              )
            )}
          </div>
          <div className={styles.cardHeader}>
            <h3>
              <Translate description={header.translateId}>
                {header.label}
              </Translate>
            </h3>
          </div>
          <div className={styles.cardBody}>
            <p>
              <Translate description={body.translateId}>{body.label}</Translate>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;