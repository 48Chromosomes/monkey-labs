import { Document } from 'langchain/document';

export type ChatLog = {
  role: 'apiMessage' | 'userMessage';
  content: string;
  silent?: boolean;
  sourceDocs?: Document[];
};

export type AllowedRoles = 'ASSISTANT' | 'SOFTWARE_ENGINEER' | 'TWEETER' | '-';
export type AllowedVectorStores = 'Pinecone' | 'HNSWLib';

export type Role = {
  id: AllowedRoles;
  label: string;
  description?: string;
  temperature: number;
  prompt: string;
};

export type AppStoreInterface = (
  set: (arg0: any) => void,
  get: () => any,
) => {
  chatLogs: ChatLog[];
  listenerActive: boolean;
  currentIndex: string;
  currentVectorStore: AllowedVectorStores;
  currentRole: Role;
  roles: Role[];
  resetChat: () => void;
  setChatLogs: ({ role, content, silent }: ChatLog) => void;
  toggleListener: () => void;
  setCurrentIndex: (index: string) => void;
  setCurrentRole: ({ roleId }: { roleId: AllowedRoles }) => void;
  getRoles: () => Promise<void>;
  setCurrentVectorStore: (vectorStore: AllowedVectorStores) => void;
};
