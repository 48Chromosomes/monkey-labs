import React, { useEffect, useState } from 'react';
import styles from './Narrator.module.scss';

import { useAppStore } from '@/stores/AppStore';
import { sendTTS } from '@/utilities/tts';
import { speak } from '@/utilities/speak';

export default function Narrator() {
  const { narrationList } = useAppStore();
  const [transcription, setTranscription] = useState('');
  const [canPlay, setCanPlay] = useState(false);
  const [index, setIndex] = useState(0);
  const [containerVisible, setContainerVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(false);

  useEffect(() => {
    const playNarration = async () => {
      if (canPlay && index < narrationList.length) {
        setContainerVisible(true);
        const narration = narrationList[index];
        const stream = await sendTTS({ text: narration });
        setTranscription(narration);
        setIsFadingOut(false);
        speak({
          stream,
          callback: () => {
            setIsFadingOut(true);
            setTimeout(() => {
              setIndex(index + 1);
            }, 500);
          },
        });
      } else {
        setContainerVisible(false);
      }
    };
    playNarration();
  }, [canPlay, index, narrationList]);

  useEffect(() => setIsFadingIn(true), [transcription]);

  const handleStartAudioContext = () => setCanPlay(true);

  return (
    <>
      <div className={`${styles.narratorContainer} ${containerVisible && styles.visible}`}>
        <div className={`${styles.narrator} ${isFadingOut && styles.fadeOut} ${isFadingIn && styles.fadeIn}`}>
          <h1>{transcription}</h1>
        </div>
      </div>

      {!canPlay && <button onClick={handleStartAudioContext}>Play</button>}
    </>
  );
}
