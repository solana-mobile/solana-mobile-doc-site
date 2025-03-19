import React from "react";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

function HeroCTACard({ title, description, icon: Icon, to }) {
  return (
    <Link to={to} className={styles.cardLink}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <Icon size={24} className={styles.icon} />
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </Link>
  );
}

export default HeroCTACard;
