import React from 'react';
import * as Switch from '@radix-ui/react-switch';

import styles from './Actions.module.scss';

import { useAppStore } from '@/stores/AppStore';

export default function Actions() {
  const { resetChat, toggleListener } = useAppStore();

  return (
    <>
      <div className={styles.actionsContainer}>
        <button type='button' onClick={resetChat} className={styles.button}>
          New Chat
        </button>

        <div className={styles.switchContainer}>
          <label className={styles.label} htmlFor='listener'>
            Toggle Listener
          </label>
          <Switch.Root className={styles.switchRoot} id='listener' onCheckedChange={toggleListener}>
            <Switch.Thumb className={styles.switchThumb} />
          </Switch.Root>
        </div>
      </div>
    </>
  );
}
