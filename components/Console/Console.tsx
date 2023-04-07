import React, { useRef, useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { fetchEventSource } from '@microsoft/fetch-event-source';

import styles from './Console.module.scss';

import { useAppStore } from '@/stores/AppStore';
import { ChatLog } from '@/types';

import ChatAvatar from '@/components/Console/Avatar/Avatar';
import Listener from '@/components/Console/Listener/Listener';

export default function Console() {
  const { chatLogs, setChatLogs, listenerActive, currentIndex } = useAppStore();
  const messageListRef = useRef<HTMLDivElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [sourceDocs, setSourceDocs] = useState<Document[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [messageStream, setMessageStream] = useState<string>('');

  useEffect(() => {
    textInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [chatLogs]);

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const question = query.trim();

    setLoading(true);
    setError(null);
    setQuery('');

    setChatLogs({ role: 'userMessage', content: question });

    const ctrl = new AbortController();
    let stream = '';

    try {
      fetchEventSource('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          chatLogs,
          currentIndex,
        }),
        signal: ctrl.signal,
        onmessage: (event) => {
          if (event.data === '[DONE]') {
            setChatLogs({ role: 'apiMessage', content: stream, sourceDocs });
            setMessageStream('');
            setLoading(false);
            ctrl.abort();
          } else {
            const chunk = JSON.parse(event.data);

            if (chunk.sourceDocs) {
              setSourceDocs(chunk.sourceDocs);
            } else {
              stream = stream + chunk.data;
              setMessageStream(stream);
            }
          }
        },
      });
    } catch (error) {
      setLoading(false);
      setError('An error occurred while fetching the data. Please try again.');
      console.log('error', error);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value);

  const onListenerResult = (transcript: string) => setQuery(transcript);

  const onListenerBegin = () => setQuery('');

  const onListenerComplete = () => formRef.current?.submit();

  return (
    <>
      <div className={styles.consoleContainer}>
        <div className={styles.chatLogContainer} ref={messageListRef}>
          {chatLogs &&
            chatLogs.map((log: ChatLog, index: number) => (
              <div key={index} className={styles.log}>
                <ChatAvatar type={log.role} />
                <div className={styles.logText}>{log.content}</div>
              </div>
            ))}

          {messageStream.length > 0 && (
            <div className={styles.log}>
              <ChatAvatar type='apiMessage' />
              <div className={styles.logText}>{messageStream}</div>
            </div>
          )}

          {loading && (
            <Image className={styles.loader} src='/images/ellipsis.gif' alt='ellipis' width={50} height={50} />
          )}
        </div>

        <form className={styles.form} onSubmit={onSubmit} ref={formRef}>
          <input
            ref={textInputRef}
            type='text'
            className={styles.promptText}
            value={query}
            name='text'
            onChange={onChange}
          />

          {listenerActive && (
            <Listener
              onListenerBegin={onListenerBegin}
              onListenerComplete={onListenerComplete}
              onListenerResult={onListenerResult}
            />
          )}

          <button className={styles.button} type='submit'>
            <Image src='/images/send.svg' alt='Send' width={20} height={20} />
          </button>
        </form>
      </div>
    </>
  );
}
