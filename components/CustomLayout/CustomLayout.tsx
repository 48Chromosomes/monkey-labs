import { useEffect, useState, ReactNode } from 'react';

import styles from './CustomLayout.module.scss';

export default function CustomLayout({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => setIsHydrated(true), []);

  return <div className={styles.customContainer}>{isHydrated ? children : <div>Loading...</div>}</div>;
}
