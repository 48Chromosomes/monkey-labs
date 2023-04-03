import React from 'react';

import styles from './Actions.module.scss';

import { useAppStore } from '@/stores/AppStore';

export default function Actions() {
  const { resetChat } = useAppStore();

  return (
    <>
      <div className={styles.actionsContainer}>
        <button type='button' onClick={resetChat} className={styles.button}>
          New Chat
        </button>
      </div>
    </>
  );
}
