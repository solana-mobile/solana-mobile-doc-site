import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
import Translate from "@docusaurus/Translate";
import useBaseUrl from '@docusaurus/useBaseUrl';

interface SmallCardProps {
  header: {
    label: string;
    translateId: string;
  };
  to: string;
  iconPath?: string;
}

const SmallCard: React.FC<SmallCardProps> = ({ header, to, iconPath }) => {
  return (
    <div className={styles.cardContainer}>
      <Link className={styles.cardLink} to={to}>
          {iconPath && <img src={useBaseUrl(iconPath)} alt="" className={styles.cardIcon} />}
          <div className={styles.cardHeaderText}>
            <Translate description={header.translateId}>
              {header.label}
            </Translate>
          </div>
      </Link>
    </div>
  );
}

export default SmallCard;