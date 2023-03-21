import React, { useState, useEffect } from 'react';
import styles from './Actions.module.scss';

import { useAppStore } from '@/stores/AppStore';
import prompts from '@/consts/prompts.json';

import { send } from '@/utilities/messanger';

export default function Actions() {
  const { sendPrompt, resetGame, character, waitingForResponse } = useAppStore();
  const [disableCharacterButton, setDisableCharacterButton] = useState(false);
  const [disableBeginGameButton, setDisableBeginGameButton] = useState(false);

  useEffect(() => {
    if (character || waitingForResponse) setDisableCharacterButton(true);

    if (waitingForResponse) {
      setDisableBeginGameButton(true);
    } else {
      setDisableBeginGameButton(false);
    }
  }, [character, waitingForResponse]);

  const sendCharacterPrompt = () => sendPrompt({ prompt: prompts.generate_character });

  const sendBeginGamePrompt = () => {
    sendPrompt({ prompt: prompts.begin_game });
    setDisableBeginGameButton(true);
  };

  const resetGameClick = () => {
    resetGame();
    setDisableCharacterButton(false);
    setDisableBeginGameButton(false);
  };

  const triggerNarration = () => {
    send({ message: 'triggerNarration' });
  };

  return (
    <>
      <div className={styles.actionsContainer}>
        <button className={styles.button} type='button' onClick={triggerNarration} disabled={disableCharacterButton}>
          Trigger Narration
        </button>

        <hr className={styles.break}></hr>

        <button className={styles.button} type='button' onClick={sendCharacterPrompt} disabled={disableCharacterButton}>
          Get character
        </button>

        <button className={styles.button} type='button' onClick={sendBeginGamePrompt} disabled={disableBeginGameButton}>
          Begin game
        </button>

        <hr className={styles.break}></hr>

        <button className={styles.button} type='button' onClick={resetGameClick}>
          Reset game
        </button>
      </div>
    </>
  );
}
