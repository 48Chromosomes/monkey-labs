import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import styles from '@/styles/Home.module.scss';

const Stage = dynamic(() => import('@/components/Stage/Stage'), { ssr: false });
const Console = dynamic(() => import('@/components/Console/Console'), { ssr: false });
const Actions = dynamic(() => import('@/components/Actions/Actions'), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>DND</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Stage />
        <Actions />
        <Console />
      </main>
    </>
  );
}
