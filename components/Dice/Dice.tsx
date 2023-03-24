import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import styles from './Dice.module.scss';

import { socket } from '@/utilities/messanger';
import { MESSAGES } from '@/consts/messages';

export default function Dice() {
  const [currentFace, setCurrentFace] = useState(1);
  const [showDice, setShowDice] = useState(false);
  const [rolling, setRolling] = useState(false);

  useEffect(() => setCurrentFace(1), []);

  socket.onmessage = (event: MessageEvent) => {
    if (event.data === MESSAGES.TRIGGER_DICE_ROLL) rollDice();
  };

  const rollDice = () => {
    const randomNumber = Math.floor(Math.random() * 20) + 1;

    setShowDice(true);

    setRolling(true);
    setCurrentFace(randomNumber);

    setTimeout(() => {
      setCurrentFace(randomNumber);
      setRolling(false);
    }, 3000);

    setTimeout(() => setShowDice(false), 10000);
  };

  const renderFaces = () => {
    const faces = [];

    for (let i = 1; i <= 20; i++) {
      const className = `${styles.face} ${currentFace === i ? styles.active : ''}`;
      faces.push(<figure key={i} className={className}></figure>);
    }

    return faces;
  };

  return (
    <>
      {showDice && (
        <div className={styles.diceContainer}>
          <div className={cx(styles.die, { [styles.rolling]: rolling })} data-face={currentFace}>
            {renderFaces()}
          </div>
        </div>
      )}
    </>
  );
}
