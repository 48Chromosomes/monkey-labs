import React, { useEffect } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { HamburgerMenuIcon, CheckIcon } from '@radix-ui/react-icons';

import styles from './RoleSelection.module.scss';

import { useAppStore } from '@/stores/AppStore';
import { Role, AllowedRoles } from '@/types';

import InfoCard from '@/components/InfoCard/InfoCard';

export default function RoleSelection() {
  const { resetChat, currentRole, setCurrentRole, roles, getRoles } = useAppStore();
  const { label, description } = currentRole;

  useEffect(() => {
    getRoles();
  }, []);

  const selectRole = (value: any) => {
    const roleId: AllowedRoles = value;

    if (roleId !== currentRole.id) {
      setCurrentRole({ roleId });
      resetChat();
    }
  };

  return (
    <div className={styles.rolesContainer}>
      <div className={styles.currentRoleLabel}>
        <span>Current role</span>
        {label}

        <InfoCard>{description}</InfoCard>
      </div>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className={styles.iconButton} aria-label='Select model'>
            <HamburgerMenuIcon />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content side='bottom' className={styles.dropdownMenuContent} sideOffset={5}>
            <DropdownMenu.RadioGroup value={currentRole.id} onValueChange={selectRole}>
              {roles.map((role: Role, index: number) => (
                <DropdownMenu.RadioItem key={index} className={styles.dropdownMenuItem} value={role.id}>
                  <DropdownMenu.ItemIndicator className={styles.dropdownMenuItemIndicator}>
                    <CheckIcon />
                  </DropdownMenu.ItemIndicator>
                  {role.label}
                </DropdownMenu.RadioItem>
              ))}
            </DropdownMenu.RadioGroup>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}
