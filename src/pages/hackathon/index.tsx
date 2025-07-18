import React, { useRef } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

export default function HackathonPage() {
  const {siteConfig} = useDocusaurusContext();
  const formSectionRef = useRef(null);
  
  const scrollToForm = () => {
    formSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <Layout
      title="Solana Mobile Hackathon"
      description="Join the Solana Mobile Hackathon and build the future of mobile dApps">
      <Head>
        <meta property="og:title" content="Solana Mobile Hackathon" />
        <meta property="og:description" content="Join the Solana Mobile Hackathon and build the future of mobile dApps" />
        <meta property="og:image" content="https://cdn.prod.website-files.com/685357732354043b88fbf118/68640c055711a79babb5f498_smh-opengraph.png" />
        <meta name="twitter:image" content="https://cdn.prod.website-files.com/685357732354043b88fbf118/68640c055711a79babb5f498_smh-opengraph.png" />
      </Head>
      
      <div className={styles.heroBanner}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Solana Mobile Hackathon</h1>
          <p className={styles.heroSubtitle}>Get ready Solana Mobile Developers!</p>
          <button className={styles.heroButton} onClick={scrollToForm}>
            Notify Me
          </button>
        </div>
      </div>

      <main className={styles.container}>
        <section className={styles.section}>
          <h2>What is it?</h2>
          <p>
            In July, Solana Mobile will be launching its very first hackathon — the <b>Solana Mobile Hackathon</b> — 
            focused on creating brand new mobile Solana dApps OR converting existing Solana dApps to mobile 
            for submission to the Solana dApp Store.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2>What's the goal?</h2>
          <p>
            The future of crypto is mobile, and Solana Mobile and Seeker offer a unique opportunity for 
            developers to access 170,000+ native Solana devices from day one of launch. We want to make 
            sure the mobile dApp store is filled with some of the best and most unique experiences in crypto. 
            Whether you're starting with a fresh idea or pivoting your existing Solana web app to mobile, 
            we want you to build for a mobile future!
          </p>
        </section>
        
        <section className={styles.section}>
          <h2>What's the opportunity?</h2>
          <p>
            First and foremost we believe that being a first mover into a platform with so many native Solana 
            users from day one provides a unique and BIG opportunity for new projects looking for distribution. 
            Instead of fighting for attention on social media amongst thousands of blockchains and apps, you're 
            only competing against a small set of first movers who build for mobile — and to a userbase of power 
            users eager to be first in line for new onchain experiences.
          </p>
          <p>
            …But that's not all. Did we mention <b>PRIZES</b>?
          </p>
          <p>
            While full details are still being worked out, <b>we are looking to offer a variety of prize types:</b>
          </p>
          <ul>
            <li>Marketing and launch support</li>
            <li>Cash prizes</li>
            <li>Seeker devices</li>
            <li>Special track prizes</li>
            <li>Highlighted or featured dApp store placement</li>
          </ul>
          <p>
            All of the above is subject to change until official details have gone live.
          </p>
          <p>              
            We look forward to building the future of mobile <strong>ON SOLANA</strong> with you!
          </p>
        </section>
        
        <section className={styles.section} ref={formSectionRef}>     
          <h2>Stay Updated</h2>
          <p>If you'd like to be notified via email when the official hackathon is announced, please provide your email below.</p>       
          <div className={styles.formContainer}>
            <iframe 
              className={styles.formIframe}
              src="https://sibforms.com/serve/MUIFABMRJC8zD-vc3DheO0j6SJAeC40-OH3210jahjQ8oo6yD9sJ1lB1mQqlNlANVHjTsPKfAgX4N9x_mlxDBrX_mw6tiZSXkX4b82XrD9_6rDY79Olnud2y7s45NSX-cGJ1m-AtHQZtfC6hGCBZfSPtOo0xUiXFAR2cgaTm7JYx3OdHKcn8tRybHEkcKxQHpU-Uh2xC1uWtH_Cv"
              scrolling="no"
              allowFullScreen
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}