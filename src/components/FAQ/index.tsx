import React, { useState } from "react";
import clsx from "clsx";
import { useColorMode } from "@docusaurus/theme-common";
import styles from "./styles.module.css";

const FAQSection = ({ title, children, isLast, expanded = false }) => {
  const [isOpen, setIsOpen] = useState(expanded);
  const { colorMode } = useColorMode();

  return (
    <div
      className={clsx(
        styles.item,
        isOpen && styles.open,
        colorMode === "dark" ? styles.darkMode : styles.lightMode
      )}
    >
      <button
        className={clsx(styles.question, isOpen && styles.questionOpen)}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.titleWrapper}>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <span className={styles.icon}>{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && <div className={styles.answer}>{children}</div>}
      {!isLast && !isOpen && <div className={styles.divider} />}
    </div>
  );
};

const FAQ = ({ children, className }) => {
  const { colorMode } = useColorMode();

  return (
    <div
      className={clsx(
        styles.container,
        className,
        colorMode === "dark" ? styles.darkMode : styles.lightMode
      )}
    >
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          isLast: index === React.Children.count(children) - 1,
        })
      )}
    </div>
  );
};

export { FAQ, FAQSection };
