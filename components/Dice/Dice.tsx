import React, { useRef, useState } from 'react';

import '@/node_modules/threejs-dice/lib/dice.css';

import { init } from '@/utilities/dice';

export default function Dice() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const rollDice = init({ container: canvasRef.current });

  const handleClick = async () => {
    rollDice();
  };

  return (
    <div>
      <h2>Roll a 20-sided dice:</h2>
      <button onClick={handleClick}>Roll the dice!</button>
      <canvas ref={canvasRef} style={{ position: 'absolute', left: '0px', top: '0px' }}></canvas>
    </div>
  );
}
