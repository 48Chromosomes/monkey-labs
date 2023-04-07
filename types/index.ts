export type ChatLog = {
  role: 'apiMessage' | 'userMessage';
  content: string;
  silent?: boolean;
  sourceDocs?: Document[];
};

export type AppStoreInterface = (
  set: (arg0: any) => void,
  get: () => any,
) => {
  chatLogs: ChatLog[];
  listenerActive: boolean;
  currentIndex: string;
  resetChat: () => void;
  setChatLogs: ({ role, content, silent }: ChatLog) => void;
  toggleListener: () => void;
  setCurrentIndex: (index: string) => void;
};
