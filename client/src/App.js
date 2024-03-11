import React, { useState, useEffect, useRef } from 'react';
import { launch } from './phaser/game';
import DifficultySelection from './components/DifficultySelection';

function App() {
  const [difficulty, setDifficulty] = useState('');
  const phaserGameRef = useRef(null);

  useEffect(() => {
    if (difficulty && phaserGameRef.current) {
      // Передайте выбранный уровень сложности в игру
      launch(phaserGameRef.current.id, difficulty);
    }
  }, [difficulty]);

  return (
    <div className="App">
      {difficulty ? (
        <div id="phaser-game" ref={phaserGameRef}></div>
      ) : (
        <DifficultySelection onSelectDifficulty={setDifficulty} />
      )}
    </div>
  );
}

export default App;
