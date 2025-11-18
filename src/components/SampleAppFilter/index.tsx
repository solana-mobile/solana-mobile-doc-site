import React, { useState, ReactNode } from 'react';
import styles from './styles.module.css';

interface SampleAppFilterProps {
  children: {
    all?: ReactNode;
    'react-native'?: ReactNode;
    android?: ReactNode;
    testing?: ReactNode;
  };
}

export const SampleAppFilter: React.FC<SampleAppFilterProps> = ({ children }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'react-native', label: 'React Native' },
    { id: 'android', label: 'Android' },
    { id: 'testing', label: 'Testing Apps' },
  ];

  return (
    <div className={styles.sampleAppFilter}>
      <div className={styles.filterTabs}>
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`${styles.filterTab} ${
              activeFilter === filter.id ? styles.active : ''
            }`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className={styles.filterContent}>
        {activeFilter === 'all' ? (
          <>
            {children['react-native']}
            {children['android']}
            {children['testing']}
          </>
        ) : (
          children[activeFilter]
        )}
      </div>
    </div>
  );
};

export default SampleAppFilter;
