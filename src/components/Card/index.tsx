

import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
import Translate from "@docusaurus/Translate";

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
  externalIcon?: boolean;
}

const Card: React.FC<CardProps> = ({ header, body, to, externalIcon }) => {
  /*
  Both the `header` and `body` expect an object with the following type
  header = {
    label: String, //
    translateId: String //
  }
  */

  return (
    <div className={styles.cardContainer}>
      <Link className={styles.cardLink} to={to}>
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
      </Link>
    </div>
  );
}

export default Card;