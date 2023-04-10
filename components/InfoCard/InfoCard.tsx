import React from 'react';
import * as HoverCard from '@radix-ui/react-hover-card';
import { InfoCircledIcon } from '@radix-ui/react-icons';

import styles from './InfoCard.module.scss';

export default function InfoCard({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.infoCardContainer}>
      <HoverCard.Root>
        <HoverCard.Trigger className={styles.hoverCardTrigger} asChild>
          <InfoCircledIcon width='16' height='16' />
        </HoverCard.Trigger>

        <HoverCard.Portal>
          <HoverCard.Content className={styles.hoverCardContent}>{children}</HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>
    </div>
  );
}
