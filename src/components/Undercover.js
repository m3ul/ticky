import React, { useState } from 'react';
import PlayerList from './PlayerList';
import GamePlay from './GamePlay';

const words = [
  "apple", "banana", "carrot", "dolphin", "elephant",
  "flower", "giraffe", "hamburger", "icecream", "jellyfish"
];

const Undercover = () => {
  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [word, setWord] = useState('');

  const handlePlayersSubmit = (players) => {
    setPlayers(players);
    setGameStarted(true);
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
  };

  return (
    <div className="game">
      {!gameStarted ? (
        <PlayerList onPlayersSubmit={handlePlayersSubmit} />
      ) : (
        <GamePlay players={players} word={word} />
      )}
    </div>
  );
};

export default Undercover;
