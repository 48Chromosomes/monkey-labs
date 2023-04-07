import React from 'react';

import styles from './Actions.module.scss';

import ModelSelection from '@/components/Actions/ModelSelection/ModelSelection';
import NewChatButton from '@/components/Actions/NewChatButton/NewChatButton';
import ToggleListener from '@/components/Actions/ToggleListener/ToggleListener';

export default function Actions() {
  return (
    <div className={styles.actionsContainer}>
      <ModelSelection />
      <NewChatButton />
      <ToggleListener />
    </div>
  );
}
