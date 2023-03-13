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

export type ChatLog = {
  role: string;
  content: string;
};
