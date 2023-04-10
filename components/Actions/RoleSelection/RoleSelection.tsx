import React, { useEffect, useState, MouseEventHandler } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { HamburgerMenuIcon, CheckIcon } from '@radix-ui/react-icons';

import styles from './RoleSelection.module.scss';

import { useAppStore } from '@/stores/AppStore';
import { Role } from '@/types';

export default function RoleSelection() {
  const { resetChat, currentRole, setCurrentRole } = useAppStore();
  const ROLES: Role[] = ['ASSISTANT', 'SOFTWARE_ENGINEER', 'TWEETER'];
  const roleLabels: { [key in Role]: string } = {
    ASSISTANT: 'Assistant',
    SOFTWARE_ENGINEER: 'Software Engineer',
    TWEETER: 'Tweeter',
  };

  const selectIndex = (value: any) => {
    if (value !== currentRole) {
      setCurrentRole(value);
      resetChat();
    }
  };

  return (
    <div className={styles.rolesContainer}>
      <div className={styles.currentRoleLabel}>
        <span>Current role</span>
        {roleLabels[currentRole]}
      </div>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className={styles.iconButton} aria-label='Select model'>
            <HamburgerMenuIcon />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content side='bottom' className={styles.dropdownMenuContent} sideOffset={5}>
            <DropdownMenu.RadioGroup value={currentRole} onValueChange={selectIndex}>
              {ROLES.map((role: Role, index: number) => (
                <DropdownMenu.RadioItem key={index} className={styles.dropdownMenuItem} value={role}>
                  <DropdownMenu.ItemIndicator className={styles.dropdownMenuItemIndicator}>
                    <CheckIcon />
                  </DropdownMenu.ItemIndicator>
                  {roleLabels[role]}
                </DropdownMenu.RadioItem>
              ))}
            </DropdownMenu.RadioGroup>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}
