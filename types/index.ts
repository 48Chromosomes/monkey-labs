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
  resetChat: () => void;
  setChatLogs: ({ role, content, silent }: ChatLog) => void;
};
