import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import styles from '@/styles/Home.module.scss';

const Console = dynamic(() => import('@/components/Console/Console'), {
  ssr: false,
});
import Actions from '@/components/Actions/Actions';

export default function Home() {
  return (
    <>
      <Head>
        <title>MonkeyLabs</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.png' />
      </Head>

      <main className={styles.main}>
        <Console />
        <Actions />
      </main>
    </>
  );
}
