import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import styles from './Character.module.scss';

import { useAppStore } from '@/stores/AppStore';
import { socket } from '@/utilities/messanger';
import { MESSAGES } from '@/consts/messages';

export default function CharacterSheet() {
  const { character } = useAppStore();
  const [showCharacter, setShowCharacter] = useState(false);
  const [fadeOut, setFadeOut] = useState(true);

  useEffect(() => {
    if (character) setShowCharacter(true);
  }, [character]);

  socket.onmessage = (event: MessageEvent) => {
    if (event.data === MESSAGES.TRIGGER_NARRATION) setFadeOut(true);
    if (event.data === MESSAGES.NARRATION_COMPLETE) setFadeOut(false);
  };

  return (
    <>
      <div className={cx(styles.characterContainer, { [styles.faded]: fadeOut, [styles.show]: showCharacter })}>
        <h1>{character?.name}</h1>
        <p>{showCharacter}</p>
        <p>Class: {character?.class}</p>
        <p>Race: {character?.race}</p>
        <p>Background: {character?.background}</p>
        <p>Alignment: {character?.alignment}</p>
        <div className={styles.stats}>
          <p>
            Strength <span>{character?.stats?.strength}</span>
          </p>
          <p>
            Dexterity <span>{character?.stats?.dexterity}</span>
          </p>
          <p>
            Constitution <span>{character?.stats?.constitution}</span>
          </p>
          <p>
            Intelligence <span>{character?.stats?.intelligence}</span>
          </p>
          <p>
            Wisdom: <span>{character?.stats?.wisdom}</span>
          </p>
          <p>
            Charisma: <span>{character?.stats?.charisma}</span>
          </p>
        </div>
        <div className={styles.additionalInfo}>
          <div>
            <h2>Proficiencies</h2>

            <ul>
              {character?.proficiencies.map((proficiency: string, index: number) => (
                <li key={index} className={styles.tag}>
                  {proficiency}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Equipment</h2>

            <ul>
              {character?.equipment.map((item: string, index: number) => (
                <li key={index} className={styles.tag}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
