import React from 'react';
import Head from 'next/head';
import styles from '@/styles/Admin.module.scss';

import Console from '@/components/Console/Console';
import Actions from '@/components/Actions/Actions';

export default function Admin() {
  return (
    <>
      <Head>
        <title>DND</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Console />
        <Actions />
      </main>
    </>
  );
}
