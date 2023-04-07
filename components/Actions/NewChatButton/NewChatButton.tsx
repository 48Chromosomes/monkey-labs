import React, { useEffect, useState } from 'react';

import styles from './NewChatButton.module.scss';

import { useAppStore } from '@/stores/AppStore';

export default function Actions() {
  const { resetChat } = useAppStore();

  return (
    <button type='button' onClick={resetChat} className={styles.button}>
      New Chat
    </button>
  );
}
