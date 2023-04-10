import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { ChatLog, Role, AppStoreInterface, AllowedRoles } from '@/types';
import { getRoles } from '@/utilities/api/getRoles';

const initialChatLog: ChatLog = {
  role: 'apiMessage',
  content: 'Hi, what would you like to talk about?',
  silent: false,
  sourceDocs: [],
};

const initialCurrentRole: Role = {
  id: '-',
  label: '-',
};

export const AppStore: AppStoreInterface = (set: (arg0: any) => void, get: () => any) => ({
  chatLogs: [initialChatLog],
  listenerActive: false,
  currentIndex: '',
  currentRole: initialCurrentRole,
  roles: [],
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
  setCurrentIndex: (index: string) => set({ currentIndex: index }),
  setCurrentRole: ({ roleId }: { roleId: AllowedRoles }) => {
    const { roles }: { roles: Role[] } = get();
    const role: Role | undefined = roles.find((role: Role) => role.id === roleId);
    set({ currentRole: role });
  },
  getRoles: async () => {
    const roles = await getRoles();
    set({ roles });
    const { currentRole }: { currentRole: Role } = get();
    if (currentRole == initialCurrentRole) set({ currentRole: roles[0] });
  },
});

export const useAppStore = create(
  persist(AppStore, {
    name: 'AppStore',
  }),
);
