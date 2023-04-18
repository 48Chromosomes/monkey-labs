import React, { useState } from 'react';
import cx from 'classnames';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';

import styles from './Actions.module.scss';

import VectorStoreSelection from '@/components/Actions/VectorStoreSelection/VectorStoreSelection';
import ModelSelection from '@/components/Actions/ModelSelection/ModelSelection';
import RoleSelection from '@/components/Actions/RoleSelection/RoleSelection';
import NewChatButton from '@/components/Actions/NewChatButton/NewChatButton';
import ToggleListener from '@/components/Actions/ToggleListener/ToggleListener';

import { useWindowSize } from '@/utilities/hooks/useWindowSize';

export default function Actions() {
  const { width } = useWindowSize();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className={cx(styles.actionsContainer, { [styles.open]: menuOpen })}>
      {width && width < 1000 && (
        <div className={styles.hamburgerMenu} onClick={toggleMenu}>
          <HamburgerMenuIcon width='24' height='24' />
        </div>
      )}

      <VectorStoreSelection />
      <ModelSelection />
      <RoleSelection />
      <NewChatButton />
      <ToggleListener />
    </div>
  );
}
