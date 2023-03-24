import React, { useEffect } from 'react';

import { useAppStore } from '@/stores/AppStore';
import { send, socket } from '@/utilities/messanger';
import { PROMPTS } from '@/consts/prompts';
import { MESSAGES } from '@/consts/messages';

export default function Director() {
  const { sendPrompt, resetGame } = useAppStore();

  socket.onmessage = (event: MessageEvent) => {
    if (event.data === MESSAGES.TRIGGER_BEGIN_GAME) beginGame();
  };

  const beginGame = async () => {
    console.log('Game Begun');

    // Reset game
    resetGame();

    // Get character
    await sendPrompt({ prompt: PROMPTS.GENERATE_CHARACTER });

    // Begin game
    await sendPrompt({ prompt: PROMPTS.BEGIN_GAME });

    // Trigger narration
    send({ message: MESSAGES.TRIGGER_NARRATION });
  };

  return <></>;
}
