import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styles from './Stage.module.scss';

import { useAppStore } from '@/stores/AppStore';

import Dice from '@/components/Dice/Dice';

const Narrator = dynamic(() => import('@/components/Narrator/Narrator'), {
  ssr: false,
});

export default function Stage() {
  const { background } = useAppStore();
  const [backgroundStyle, setBackgroundStyle] = useState({});

  useEffect(() => {
    setBackgroundStyle({ backgroundImage: `url(${background})` });
  }, [background]);

  return (
    <>
      <div className={styles.stageContainer} style={backgroundStyle}>
        <Narrator />
      </div>
    </>
  );
}
