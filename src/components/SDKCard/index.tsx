import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
import Translate from "@docusaurus/Translate";
import useBaseUrl from '@docusaurus/useBaseUrl';

interface SDKCardProps {
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
}

const SDKCard: React.FC<SDKCardProps> = ({ header, body, to, iconPath }) => {
  return (
    <div className={styles.cardContainer}>
      <Link className={styles.cardLink} to={to}>
        <div className={styles.cardHeader}>
          {iconPath && <img src={useBaseUrl(iconPath)} alt="" className={styles.cardIcon} />}
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
      </Link>
    </div>
  );
}

export default SDKCard;