import React, { useEffect, useState, MouseEventHandler } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { HamburgerMenuIcon, CheckIcon } from '@radix-ui/react-icons';

import styles from './VectorStoreSelection.module.scss';

import { useAppStore } from '@/stores/AppStore';
import { AllowedVectorStores } from '@/types';

export default function ModelSelection() {
  const { resetChat, currentVectorStore, setCurrentVectorStore } = useAppStore();
  const VECTOR_STORES: AllowedVectorStores[] = ['Local', 'Pinecone'];

  useEffect(() => {
    if (!currentVectorStore) setCurrentVectorStore(VECTOR_STORES[0]);
  }, []);

  const selectIndex: (value: string) => void = (value) => {
    if (value !== currentVectorStore) {
      setCurrentVectorStore(value as AllowedVectorStores);
      resetChat();
    }
  };

  return (
    <div className={styles.vectorStoreContainer}>
      <div className={styles.currentVectorStoreLabel}>
        <span>Current vector store</span>
        {currentVectorStore}
      </div>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className={styles.iconButton} aria-label='Select model'>
            <HamburgerMenuIcon />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content side='bottom' className={styles.dropdownMenuContent} sideOffset={5}>
            <DropdownMenu.RadioGroup value={currentVectorStore} onValueChange={selectIndex}>
              {VECTOR_STORES.map((vectorStore, index) => (
                <DropdownMenu.RadioItem key={index} className={styles.dropdownMenuItem} value={vectorStore}>
                  <DropdownMenu.ItemIndicator className={styles.dropdownMenuItemIndicator}>
                    <CheckIcon />
                  </DropdownMenu.ItemIndicator>
                  {vectorStore}
                </DropdownMenu.RadioItem>
              ))}
            </DropdownMenu.RadioGroup>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}
