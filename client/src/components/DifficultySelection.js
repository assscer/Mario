import React from 'react';
import './DifficultSelection.css';

function DifficultySelection({ onSelectDifficulty }) {
  return (
    <div>
      <h2>Выберите уровень сложности</h2>
      <button onClick={() => onSelectDifficulty('easy')}>Легкий</button>
      <button onClick={() => onSelectDifficulty('hard')}>Сложный</button>
    </div>
  );
}

export default DifficultySelection;
