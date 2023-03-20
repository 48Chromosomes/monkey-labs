import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { CodeBlock } from '@handbook/code-block';

import styles from './Console.module.scss';

import { useAppStore } from '@/stores/AppStore';
import { ChatLog, PromptType } from '@/types';

export default function Console() {
  const { chatLogs, sendPrompt, waitingForResponse } = useAppStore();
  const messageListRef = useRef<HTMLDivElement>(null);
  const [prompt, setPrompt]: PromptType = useState('');

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [chatLogs]);

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    sendPrompt({ prompt });
    setPrompt('');
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setPrompt(event.target.value);

  return (
    <>
      <div className={styles.consoleContainer}>
        <div className={styles.chatLogContainer} ref={messageListRef}>
          {chatLogs &&
            chatLogs.map((log: ChatLog, index: number) => (
              <div key={index} className={styles.log}>
                {log.role === 'assistant' ? <CodeBlock language='json'>{log.content}</CodeBlock> : log.content}
              </div>
            ))}

          {waitingForResponse && (
            <Image className={styles.loader} src='/ellipsis.gif' alt='ellipis' width={50} height={50} />
          )}
        </div>

        <form className={styles.form} onSubmit={onSubmit}>
          <input type='text' className={styles.promptText} value={prompt} name='text' onChange={onChange} />
          <button className={styles.button} type='submit'>
            <Image src='/send.svg' alt='Send' width={20} height={20} />
          </button>
        </form>
      </div>
    </>
  );
}
