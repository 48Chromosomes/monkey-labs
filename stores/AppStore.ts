import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { ChatLog } from '@/types';

import { send } from '@/utilities/prompt';

import prompts from '@/consts/prompts.json';

export const AppStore = (set: (arg0: any) => void, get: () => any) => ({
  character: {},
  chatLogs: [],
  resetGame: () => set({ character: {}, chatLogs: [] }),
  sendPrompt: async ({ prompt }: { prompt: string }) => {
    const { chatLogs }: { chatLogs: ChatLog[] } = get();

    chatLogs.push({
      role: 'user',
      content: prompt,
    });

    set(() => ({ chatLogs }));

    const response: ChatLog = await send({ chatLogs });

    set((state: any) => ({ chatLogs: [...state.chatLogs, response] }));

    if (prompt === prompts.generate_character) set({ character: JSON.parse(response.content) });
  },
});

export const useAppStore = create(
  persist(AppStore, {
    name: 'AppStore',
  }),
);
