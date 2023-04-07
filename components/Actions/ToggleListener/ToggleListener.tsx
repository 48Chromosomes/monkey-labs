import React, { useEffect, useState, MouseEventHandler } from 'react';
import * as Switch from '@radix-ui/react-switch';

import styles from './ToggleListener.module.scss';

import { useAppStore } from '@/stores/AppStore';

export default function ToggleListener() {
  const { toggleListener } = useAppStore();

  return (
    <div className={styles.switchContainer}>
      <label className={styles.label} htmlFor='listener'>
        Toggle Listener
      </label>
      <Switch.Root className={styles.switchRoot} id='listener' onCheckedChange={toggleListener}>
        <Switch.Thumb className={styles.switchThumb} />
      </Switch.Root>
    </div>
  );
}
