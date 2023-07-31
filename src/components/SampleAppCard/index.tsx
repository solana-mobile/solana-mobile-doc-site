import React from "react";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import useBaseUrl from '@docusaurus/useBaseUrl';

interface SampleAppCardProps {
  title: string;
  sampleAppLink: string;
  description: string;
  imageUrl: string;
  tags: string[]; // an array of strings to represent tags
}

const SampleAppCard: React.FC<SampleAppCardProps> = ({ title, sampleAppLink, description, imageUrl, tags } ) => {
  return (
      <div className={styles.sampleAppCard}>
          <div className={styles.cardImage}>
            <img src={useBaseUrl(imageUrl)} alt={title} />
          </div>
          <div className={styles.cardBody}>
              <h2> <Link to={sampleAppLink}>{title}</Link></h2>
              <p>{description}</p>
              <div className={styles.tagSection}> 
                {tags ? 
                  tags.map((tag, index) => (  /* Only render up to 4 tags */
                    <span key={index} className={styles.tag}>{tag}</span>
                  )) : null
                }
              </div>
          </div>
      </div>
      
  );
}

export default SampleAppCard;
