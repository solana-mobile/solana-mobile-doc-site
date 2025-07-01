import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";
import { useColorMode } from "@docusaurus/theme-common";
import SolanaMobileHero from "@site/src/components/SolanaMobileHero";
import HeroCTACard from "@site/src/components/HeroCTACard";
import { Code, Store, Award, Rocket } from "lucide-react";

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

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="A mobile development stack for building Solana Mobile dApps"
    >
      <SolanaMobileHero>
        <SolanaMobileStackLogo />
        <p className={styles.tagline}>Developer Hub</p>
        <div className={styles.cardContainer}>
          <HeroCTACard
            icon={Code}
            title="Documentation"
            description="Build mobile dApps with our SDK and developer tools"
            to="/developers/overview"
          />
          <HeroCTACard
            icon={Store}
            title="dApp Store"
            description="Publish your dApp on the Solana dApp Store"
            to="/dapp-publishing/intro"
          />
          <HeroCTACard
            icon={Rocket}
            title="Hackathon"
            description="Compete in the very first Solana Mobile Hackathon"
            to="https://solanamobile.radiant.nexus/"
          />
          <HeroCTACard
            icon={Award}
            title="Grants"
            description="Help push the Solana Mobile Developer ecosystem forward"
            to="/grants"
          />
        </div>
      </SolanaMobileHero>
    </Layout>
  );
}
