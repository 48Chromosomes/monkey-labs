import React from 'react';

import styles from './Actions.module.scss';

import ModelSelection from '@/components/Actions/ModelSelection/ModelSelection';
import RoleSelection from '@/components/Actions/RoleSelection/RoleSelection';
import NewChatButton from '@/components/Actions/NewChatButton/NewChatButton';
import ToggleListener from '@/components/Actions/ToggleListener/ToggleListener';

export default function Actions() {
  return (
    <div className={styles.actionsContainer}>
      <ModelSelection />
      <RoleSelection />
      <NewChatButton />
      <ToggleListener />
    </div>
  );
}
