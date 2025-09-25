import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

export default function GrantsPage() {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <Layout
      title="Solana Mobile Builder Grants"
      description="The Solana Mobile Builder Grants Program for developers advancing the Solana Mobile Ecosystem">
      <Head>
        <meta property="og:title" content="Solana Mobile Builder Grants" />
        <meta property="og:description" content="The Solana Mobile Builder Grants Program for developers advancing the Solana Mobile Ecosystem" />
      </Head>
      
      <div className={styles.heroBanner}>
        <div className={styles.heroImage}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Builder Grants</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className={styles.container}>
        <div className={styles.sections}>
          <section className={styles.section}>
            <h2>About the Program</h2>
              <p>
                The Solana Mobile Builder Grants Program is a program dedicated to providing 
                opportunities to Solana developers that are motivated to push the Solana Mobile 
                Developer Ecosystem forward.
              </p>
              <p>
                This program will offer a few variety of grant types, 
                each with their own specific goals and functions.
              </p>
          </section>
          
          <section className={styles.section}>
            <h2>Colosseum Cypherpunk Hackathon Grants</h2>
            <p>
              We're excited to announce the Solana Mobile Builder Grants Program running alongside the 
              Colosseum Cypherpunk Hackathon. We're sweetening the prize pool for teams that bring mobile into focus.
            </p>
            <p>
              <strong>Up to 10 teams will receive $10K builder grants for mobile-focused dApps.</strong>
            </p>
          </section>

          <section className={styles.section}>
            <h2>Evaluation Criteria</h2>
            <p>
              We'll be evaluating submissions closely. It should be obvious in your submissions that you've 
              integrated or optimized for mobile — and that you intend to go mobile.
            </p>
            <p>
              <strong>If you're building mobile-first, make sure to check the mobile box on your submission ☑️</strong>
            </p>
          </section>
          
          <section className={styles.section}>
            <h2>What Selected Teams Receive</h2>
            <p>Selected teams will receive:</p>
            <ul className={styles.benefitsList}>
              <li>• <strong>$10k builder grant</strong></li>
              <li>• <strong>Marketing support</strong></li>
              <li>• <strong>Launch support</strong></li>
            </ul>
            <p>
              We'll work closely with you on your journey to launching on the Solana dApp Store.
            </p>
            <p>
              <em>Note: Grants are awarded after your dApp is submitted.</em>
            </p>
          </section>
        </div>
      </main>
    </Layout>
  );
}