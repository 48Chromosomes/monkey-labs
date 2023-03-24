import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

import styles from './Stage.module.scss';

import { useAppStore } from '@/stores/AppStore';

const Dice = dynamic(() => import('@/components/Dice/Dice'), { ssr: false });
const CharacterSheet = dynamic(() => import('@/components/Character/Character'), { ssr: false });
const Director = dynamic(() => import('@/components/Director/Director'), { ssr: false });
const Narrator = dynamic(() => import('@/components/Narrator/Narrator'), { ssr: false });

export default function Stage() {
  const { background } = useAppStore();
  const [backgroundStyle, setBackgroundStyle] = useState({});

  useEffect(() => {
    setBackgroundStyle({ backgroundImage: `url(${background})` });
  }, [background]);

  return (
    <>
      <div className={styles.stageContainer}>
        <div className={styles.stage} style={backgroundStyle}>
          <Narrator />
          <Director />
          <Dice />
          <CharacterSheet />
        </div>
      </div>
    </>
  );
}
