import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import styles from '@/styles/Home.module.scss';

const CustomLayout = dynamic(() => import('@/components/CustomLayout/CustomLayout'), {
  ssr: false,
});
import Actions from '@/components/Actions/Actions';
import Console from '@/components/Console/Console';

export default function Home() {
  return (
    <>
      <Head>
        <title>MonkeyLabs</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.png' />
      </Head>

      <main className={styles.main}>
        <CustomLayout>
          <Console />
          <Actions />
        </CustomLayout>
      </main>
    </>
  );
}
