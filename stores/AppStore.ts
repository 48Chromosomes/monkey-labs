import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { ChatLog, AppStoreInterface } from '@/types';

const initialChatLog: ChatLog = {
  role: 'apiMessage',
  content: 'Hi, what would you like to talk about?',
  silent: false,
  sourceDocs: [],
};

export const AppStore: AppStoreInterface = (set: (arg0: any) => void, get: () => any) => ({
  chatLogs: [initialChatLog],
  listenerActive: false,
  resetChat: () =>
    set({
      chatLogs: [initialChatLog],
    }),
  setChatLogs: ({ role, content, silent = false, sourceDocs = [] }: ChatLog) => {
    set((state: any) => ({
      chatLogs: [...state.chatLogs, { role, content, silent, sourceDocs }],
    }));
  },
  toggleListener: () => set((state: any) => ({ listenerActive: !state.listenerActive })),
});

export const useAppStore = create(
  persist(AppStore, {
    name: 'AppStore',
  }),
);
