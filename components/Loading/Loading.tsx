import React from 'react';
import styles from './Loading.module.scss';

const Loading = ({ text }: { text: string }) => {
  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.loadingSpinnerContainer}>
        <div className={styles.loadingSpinner}></div>
        <p className={styles.loadingText}>{text}</p>
      </div>
    </div>
  );
};

export default Loading;
