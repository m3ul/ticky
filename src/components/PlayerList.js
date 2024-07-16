import React, { useState } from 'react';
import './PlayerList.css';

const PlayerList = ({ onPlayersSubmit }) => {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState('');

  const addPlayer = () => {
    if (name) {
      setPlayers([...players, name]);
      setName('');
    }
  };

  const handleSubmit = () => {
    if (players.length > 1) {
      onPlayersSubmit(players);
    }
  };

  return (
    <div className="add-players-container">
      <h2>Add Players</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter player name"
      />
      <button onClick={addPlayer}>Add Player</button>
      <button onClick={handleSubmit}>Start Game</button>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
