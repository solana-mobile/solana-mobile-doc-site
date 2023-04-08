

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
            {externalIcon && (
              <svg
                width="13.5"
                height="13.5"
                aria-hidden="true"
                viewBox="0 0 24 24"
                className={styles.iconExternalIcon}
              >
                <path
                  fill="currentColor"
                  d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
                ></path>
              </svg>
            )}
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