import React from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import styles from './Avatar.module.scss';

const ChatAvatar = ({ type }: { type: string }) => {
  const icon = type === 'apiMessage' ? '/images/ai_icon.png' : '/images/user_icon.webp';

  return (
    <div>
      <Avatar.Root className={styles.avatarContainer}>
        <Avatar.Image className={styles.avatarImage} src={icon} alt='Avatar' />
      </Avatar.Root>
    </div>
  );
};

export default ChatAvatar;
