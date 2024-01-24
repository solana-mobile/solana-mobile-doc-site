import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
import Translate from "@docusaurus/Translate";

interface CTAButtonProps {
  label: string;
  to: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({ label, to }) => {
  return (
    <div className={styles.container}>
      <Link className={styles.ctaButton} to={to}>
        <Translate>{label}</Translate>
      </Link>
    </div>
  );
};

export default CTAButton;
