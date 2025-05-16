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
              <p>
                The details of the overall program 
                are still to be worked out to make sure the incentives are properly aligned between 
                both the potential grantee and Solana Mobile.
              </p>
          </section>
          
          <section className={styles.section}>
            <h2>Grant Types</h2>

            <p>When the program officially goes live, 
            here is what you can expect.</p>
            <ul>
              <li>
                <strong>Tooling</strong>
                <p>These grants are intended purely to help improve the mobile tool suite currently used by Solana Developers</p>
              </li>
              <li>
                <strong>Sample Applications</strong>
                <p>These grants are geared towards building sample Solana Mobile applications to help future Solana Mobile developers learn how to build mobile dApps more quickly, and all the components necessary to make them work</p>
              </li>
              <li>
                <strong>Content and Documentation</strong>
                <p>Content and documentation for Solana Mobile is improving every day, but that doesn't mean it can't get better. We will be looking to grant funds to developers who enjoy improving developer experience by providing top tier content</p>
              </li>
              <li>
                <strong>Mobile Apps</strong>
                <p>These grants will have a high bar for review and require that it's more than just a good idea, but it must also have an existing codebase that shows you're highly motivated to build mobile.</p>
              </li>
            </ul>
          </section>
          
          <section className={styles.section}>
            <h2>Timeline</h2>
            <p>
              The official builder grants program is set to go fully live in June, 2025. All of the above details 
              are subject to change prior to the official program going live. Please check back later for more details.
            </p>
          </section>
        </div>
      </main>
    </Layout>
  );
}