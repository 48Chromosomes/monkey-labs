import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { ChatLog, AppStoreInterface } from '@/types';

import { sendPrompt } from '@/utilities/prompt';
import { sendImagePrompt } from '@/utilities/midjourney';
import { splitParagraph } from '@/utilities/splitNarration';

import { PROMPTS } from '@/consts/prompts';

export const AppStore: AppStoreInterface = (set: (arg0: any) => void, get: () => any) => ({
  background: '',
  character: null,
  chatLogs: [],
  currentNarration: '',
  narrationList: [],
  waitingForResponse: false,
  resetGame: () =>
    set({
      background: '',
      character: null,
      chatLogs: [],
      currentNarration: '',
      narrationList: [],
      waitingForResponse: false,
    }),
  sendPrompt: async ({ prompt }: { prompt: string }) => {
    const { chatLogs, getImage } = get();

    const isCharacterCreatorPrompt = prompt === PROMPTS.GENERATE_CHARACTER;

    chatLogs.push({
      role: 'user',
      content: prompt,
      silent: true,
    });

    set(() => ({
      chatLogs,
      waitingForResponse: true,
    }));

    const response: ChatLog = await sendPrompt({ chatLogs });

    response.silent = isCharacterCreatorPrompt ? true : false;

    if (!response.silent) getImage({ prompt: JSON.parse(response.content).visual_description });

    set((state: any) => ({
      chatLogs: [...state.chatLogs, response],
      waitingForResponse: false,
      ...(!response.silent && {
        currentNarration: JSON.parse(response.content).story,
        narrationList: splitParagraph({ paragraph: JSON.parse(response.content).story }),
      }),
      ...(isCharacterCreatorPrompt && { character: JSON.parse(response.content) }),
    }));
  },
  getImage: async ({ prompt }: { prompt: string }) => {
    const image = await sendImagePrompt({ prompt });
    set((state: AppStoreInterface) => ({ ...state, background: image }));
  },
});

export const useAppStore = create(
  persist(AppStore, {
    name: 'AppStore',
  }),
);
