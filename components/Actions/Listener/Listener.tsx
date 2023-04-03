import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import Image from 'next/image';

import styles from './Listener.module.scss';

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

export default function Listener({
  onListenerBegin,
  onListenerResult,
  onListenerComplete,
}: {
  onListenerBegin: () => void;
  onListenerResult: (transcript: string) => void;
  onListenerComplete: () => void;
}) {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [recognition, setRecognition] = useState<any>(null);

  let recognitionTimeout: ReturnType<typeof setTimeout>;

  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (event: any) => {
      let transcript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
      }

      onListenerResult(transcript);
    };
    setRecognition(recognition);
  }, []);

  const onMouseDown = () => {
    if (!isListening) {
      onListenerBegin();
      setIsListening(true);
      recognition.start();
      const beepsound = new Audio('/audio/recording.wav');
      beepsound.play();
    }
  };

  const onMouseUp = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
      clearTimeout(recognitionTimeout);
      onListenerComplete();
    }
  };

  return (
    <>
      <div className={styles.listenerContainer}>
        <Image
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          className={cx(styles.image, { [styles.listening]: isListening })}
          src='/images/microphone.svg'
          alt='microphone'
          width={20}
          height={20}
        />
      </div>
    </>
  );
}
