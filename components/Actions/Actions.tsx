import React, { useEffect, useState, MouseEventHandler } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Switch from '@radix-ui/react-switch';
import { HamburgerMenuIcon, DotFilledIcon, CheckIcon, ChevronRightIcon } from '@radix-ui/react-icons';

import styles from './Actions.module.scss';

import { useAppStore } from '@/stores/AppStore';
import { getListIndexes } from '@/utilities/getListIndexes';

export default function Actions() {
  const { resetChat, toggleListener, currentIndex, setCurrentIndex } = useAppStore();
  const [indexes, setIndexes] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const indexes = await getListIndexes();
      setIndexes(indexes);
      if (!currentIndex) setCurrentIndex(indexes[0]);
    })();
  }, []);

  const selectIndex: (value: string) => void = (value) => {
    if (value !== currentIndex) {
      setCurrentIndex(value);
      resetChat();
    }
    console.log(value);
  };

  return (
    <>
      <div className={styles.actionsContainer}>
        <div className={styles.indexesContainer}>
          <div className={styles.currentIndexLabel}>
            <span>Current model</span>
            {currentIndex}
          </div>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className={styles.iconButton} aria-label='Customise options'>
                <HamburgerMenuIcon />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content side='bottom' className={styles.dropdownMenuContent} sideOffset={5}>
                <DropdownMenu.RadioGroup value={currentIndex} onValueChange={selectIndex}>
                  {indexes.map((indexName, index) => (
                    <DropdownMenu.RadioItem key={index} className={styles.dropdownMenuItem} value={indexName}>
                      <DropdownMenu.ItemIndicator className={styles.dropdownMenuItemIndicator}>
                        <CheckIcon />
                      </DropdownMenu.ItemIndicator>
                      {indexName}
                    </DropdownMenu.RadioItem>
                  ))}
                </DropdownMenu.RadioGroup>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>

        <button type='button' onClick={resetChat} className={styles.button}>
          New Chat
        </button>

        <div className={styles.switchContainer}>
          <label className={styles.label} htmlFor='listener'>
            Toggle Listener
          </label>
          <Switch.Root className={styles.switchRoot} id='listener' onCheckedChange={toggleListener}>
            <Switch.Thumb className={styles.switchThumb} />
          </Switch.Root>
        </div>
      </div>
    </>
  );
}
