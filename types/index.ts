export type ChatLog = {
  role: 'apiMessage' | 'userMessage';
  content: string;
  silent?: boolean;
  sourceDocs?: Document[];
};

export type Role = 'ASSISTANT' | 'SOFTWARE_ENGINEER';

export type AppStoreInterface = (
  set: (arg0: any) => void,
  get: () => any,
) => {
  chatLogs: ChatLog[];
  listenerActive: boolean;
  currentIndex: string;
  currentRole: Role;
  resetChat: () => void;
  setChatLogs: ({ role, content, silent }: ChatLog) => void;
  toggleListener: () => void;
  setCurrentIndex: (index: string) => void;
  setCurrentRole: (role: Role) => void;
};
