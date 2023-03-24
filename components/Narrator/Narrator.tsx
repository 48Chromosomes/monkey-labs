import React, { useEffect, useState } from 'react';
import { Bellefair } from 'next/font/google';

import styles from './Narrator.module.scss';

import { useAppStore } from '@/stores/AppStore';
import { sendTTS } from '@/utilities/tts';
import { speak } from '@/utilities/speak';
import { socket, send } from '@/utilities/messanger';
import { MESSAGES } from '@/consts/messages';

const inter = Bellefair({ weight: '400', subsets: ['latin'] });

export default function Narrator() {
  const { narrationList } = useAppStore();
  const [transcription, setTranscription] = useState('');
  const [index, setIndex] = useState(0);
  const [containerVisible, setContainerVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(false);
  const [canPlay, setCanPlay] = useState(false);

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
            setTimeout(() => setIndex(index + 1), 500);
          },
        });
      } else {
        setContainerVisible(false);
        send({ message: MESSAGES.NARRATION_COMPLETE });
      }
    };

    playNarration();
  }, [index, canPlay, narrationList]);

  socket.onmessage = (event: MessageEvent) => {
    if (event.data === MESSAGES.TRIGGER_NARRATION) setCanPlay(true);
    if (event.data === MESSAGES.NARRATION_COMPLETE) {
      setCanPlay(false);
      setIndex(0);
    }
  };

  useEffect(() => setIsFadingIn(true), [transcription]);

  return (
    <>
      <div className={`${styles.narratorContainer} ${containerVisible && styles.visible}`}>
        <div className={`${styles.narrator} ${isFadingOut && styles.fadeOut} ${isFadingIn && styles.fadeIn}`}>
          <h1 className={inter.className}>{transcription}</h1>
        </div>
      </div>
    </>
  );
}
