import React, { useState, useEffect } from 'react';
import styles from './Actions.module.scss';

import { useAppStore } from '@/stores/AppStore';
import { PROMPTS } from '@/consts/prompts';
import { MESSAGES } from '@/consts/messages';

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

  const sendCharacterPrompt = () => sendPrompt({ prompt: PROMPTS.GENERATE_CHARACTER });

  const sendBeginGamePrompt = () => {
    sendPrompt({ prompt: PROMPTS.BEGIN_GAME });
    setDisableBeginGameButton(true);
  };

  const resetGameClick = () => {
    resetGame();
    setDisableCharacterButton(false);
    setDisableBeginGameButton(false);
  };

  const triggerNarration = () => {
    send({ message: MESSAGES.TRIGGER_NARRATION });
  };

  const triggerDiceRoll = () => {
    send({ message: MESSAGES.TRIGGER_DICE_ROLL });
  };

  const triggerBeginGame = () => {
    send({ message: MESSAGES.TRIGGER_BEGIN_GAME });
  };

  return (
    <>
      <div className={styles.actionsContainer}>
        <button className={styles.button} type='button' onClick={triggerBeginGame} disabled={disableCharacterButton}>
          Begin Game
        </button>

        <hr className={styles.break}></hr>

        <button className={styles.button} type='button' onClick={triggerNarration}>
          Trigger Narration
        </button>

        <button className={styles.button} type='button' onClick={triggerDiceRoll}>
          Trigger Dice Roll
        </button>

        <hr className={styles.break}></hr>

        <button className={styles.button} type='button' onClick={sendCharacterPrompt} disabled={disableCharacterButton}>
          Get character
        </button>

        <button className={styles.button} type='button' onClick={sendBeginGamePrompt} disabled={disableBeginGameButton}>
          Begin game (manual)
        </button>

        <hr className={styles.break}></hr>

        <button className={styles.button} type='button' onClick={resetGameClick}>
          Reset game
        </button>
      </div>
    </>
  );
}
