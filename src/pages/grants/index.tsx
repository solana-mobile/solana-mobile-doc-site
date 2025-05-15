import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function GrantsPage() {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <Layout
      title="Solana Mobile Hackathon"
      description="Join the Solana Mobile Hackathon and build the future of mobile dApps">
      <Head>
        <meta property="og:title" content="Solana Mobile Hackathon" />
        <meta property="og:description" content="Join the Solana Mobile Hackathon and build the future of mobile dApps" />
      </Head>
      
      {/* Hero Section with Image Placeholder */}
      <div className="hero-banner" style={{
        backgroundColor: '#6e56cf', // Solana-ish purple, replace with your brand color
        padding: 0,
        position: 'relative',
        overflow: 'hidden',
        height: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* You can replace this with an actual image */}
        <div className="hero-content" style={{
          textAlign: 'center',
          color: 'white',
          zIndex: 1,
          padding: '2rem'
        }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            margin: 0
          }}>Solana Mobile Hackathon</h1>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="container" style={{
        padding: '2rem',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <div className="intro" style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            Get ready Solana Mobile Developers!
          </p>
        </div>
        
        <div className="sections" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          <section>
            <h2>What is it?</h2>
            <p>
              In June, Solana Mobile will be launching its very first hackathon — the Solana Mobile Hackathon — 
              focused on creating brand new mobile Solana dApps OR converting existing Solana dApps to mobile 
              for submission to the Solana dApp Store.
            </p>
          </section>
          
          <section>
            <h2>What's the goal?</h2>
            <p>
              The future of crypto is mobile, and Solana Mobile and Seeker offer a unique opportunity for 
              developers to access 170,000+ native Solana devices from day one of launch. We want to make 
              sure the mobile dApp store is filled with some of the best and most unique experiences in crypto. 
              Whether you're starting with a fresh idea or pivoting your existing Solana web app to mobile, 
              we want you to build for a mobile future!
            </p>
          </section>
          
          <section>
            <h2>What's the opportunity?</h2>
            <p>
              First and foremost we believe that being a first mover into a platform with so many native Solana 
              users from day one provides a unique and BIG opportunity for new projects looking for distribution. 
              Instead of fighting for attention on social media amongst thousands of blockchains and apps, you're 
              only competing against a small set of first movers who build for mobile — and to a userbase of power 
              users eager to be first in line for new onchain experiences.
            </p>
            <p>
              …But that's not all. Did we mention PRIZES?
            </p>
            <p>
              While full details are still being worked out, we are looking to offer a variety of prize types:
            </p>
            <ul>
              <li>Marketing and launch support</li>
              <li>Cash prizes</li>
              <li>Seeker devices</li>
              <li>Special track prizes</li>
              <li>Special or preferential dApp store placement</li>
            </ul>
            <p>
              All of the above is subject to change until official details have gone live.
            </p>
          </section>
          
          <section style={{
            textAlign: 'center',
            margin: '2rem 0'
          }}>
            <p style={{ fontSize: '1.25rem' }}>
              We look forward to building the future of mobile <strong>ON SOLANA</strong> with you!
            </p>
          </section>
          
          <section style={{
            backgroundColor: '#f5f5f5',
            padding: '2rem',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <p>
              If you'd like to be notified via email when the official hackathon is announced, 
              please provide your email below.
            </p>
            
            {/* Email Signup Form - Replace with your actual form component */}
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <input 
                  type="email" 
                  placeholder="Your email address"
                  style={{
                    padding: '0.75rem',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    flex: 1
                  }}
                />
                <button style={{
                  backgroundColor: '#6e56cf',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.75rem 1.5rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}>
                  Notify Me
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}