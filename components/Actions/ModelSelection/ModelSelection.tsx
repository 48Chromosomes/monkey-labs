import React, { useEffect, useState, MouseEventHandler } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { HamburgerMenuIcon, CheckIcon } from '@radix-ui/react-icons';

import styles from './ModelSelection.module.scss';

import { useAppStore } from '@/stores/AppStore';
import { getListIndexes } from '@/utilities/getListIndexes';

export default function ModelSelection() {
  const { resetChat, currentIndex, setCurrentIndex } = useAppStore();
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
  };

  return (
    <div className={styles.indexesContainer}>
      <div className={styles.currentIndexLabel}>
        <span>Current model</span>
        {currentIndex}
      </div>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className={styles.iconButton} aria-label='Select model'>
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
  );
}
