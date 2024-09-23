import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./index.module.css";
import { useColorMode } from "@docusaurus/theme-common";

export function Section({ children, className, background = "light" }) {
  const sectionClasses = clsx(styles.Section, className, background);
  return <div className={sectionClasses}>{children}</div>;
}

function ActionButton({ href, type = "primary", target, children }) {
  const classes = clsx(styles.ActionButton, styles[type]);
  return (
    <a className={classes} href={href} target={target}>
      {children}
    </a>
  );
}

function HomeCallToAction() {
  return (
    <>
      <ActionButton
        type="primary"
        href={useBaseUrl("dapp-publishing/overview")}
        target="_self"
      >
        Publish a dApp
      </ActionButton>
      <ActionButton
        type="secondary"
        href={useBaseUrl("getting-started/intro")}
        target="_self"
      >
        Learn the stack
      </ActionButton>
    </>
  );
}

function SolanaMobileStackLogo() {
  const { colorMode } = useColorMode();

  const logoSrc =
    colorMode === "dark"
      ? "img/Solana_Mobile_With_Logo_White.png"
      : "img/Solana_Mobile_With_Logo_Black.png";

  return (
    <div className={styles.logoContainer}>
      <img src={logoSrc} alt="Solana Mobile Stack" />
    </div>
  );
}

function HeaderHero() {
  return (
    <Section background="dark" className={styles.HeaderHero}>
      <SolanaMobileStackLogo />
      <>
        <p className={styles.tagline}>Build for the Web3 mobile era.</p>
        <div className={styles.buttons}>
          <HomeCallToAction />
        </div>
      </>
    </Section>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="A mobile development stack for building Solana Mobile dApps"
    >
      <HeaderHero />
    </Layout>
  );
}
