export type PromptType = [prompt: string, setPrompt: (arg0: string) => void];

export type Character = {
  name: string;
  class: string;
  race: string;
  background: string;
  alignment: string;
  stats: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  proficiencies: string[];
  equipment: string[];
};

export type StorySemgent = {
  story: string;
  roll_dice: boolean;
  game_ended: boolean;
  visual_description: string;
};

export type ChatLog = {
  role: string;
  content: string;
  silent?: boolean;
};

export type CharacterResponse = {
  role: string;
  content: StorySemgent;
  silent?: boolean;
};

export type StorySemgentResponse = {
  role: string;
  content: StorySemgent;
  silent?: boolean;
};

export type AppStoreInterface = (
  set: (arg0: any) => void,
  get: () => any,
) => {
  background: string;
  character: Character | null;
  chatLogs: ChatLog[];
  currentNarration: string;
  narrationList: string[];
  waitingForResponse: boolean;
  resetGame: () => void;
  sendPrompt: ({ prompt }: { prompt: string }) => Promise<void>;
  getImage: ({ prompt }: { prompt: string }) => Promise<void>;
};

export interface Messages {
  [key: string]: string;
}

export interface PromptMessage {
  [key: string]: string;
}
