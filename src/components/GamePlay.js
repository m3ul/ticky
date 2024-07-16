import React, { useState, useEffect } from 'react';
import './GamePlay.css';

const GamePlay = ({ players, word }) => {
  const [roles, setRoles] = useState({});
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false); // Controls showing the info screen
  const [phase, setPhase] = useState('inform'); // 'inform' or 'vote'
  const [votes, setVotes] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isDraw, setIsDraw] = useState(false);

  useEffect(() => {
    // Assign roles and determine turn order
    const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
    const mrWhite = shuffledPlayers[Math.floor(Math.random() * shuffledPlayers.length)];
    const newRoles = shuffledPlayers.reduce((acc, player) => {
      acc[player] = player === mrWhite ? 'Mr. White' : 'Villager';
      return acc;
    }, {});
    setRoles(newRoles);
  }, [players]);

  const handleNextPlayer = () => {
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
      setShowInfo(false); // Show waiting screen for the next player
    } else {
      setPhase('vote');
    }
  };

  const handleVoteSubmit = (voter, vote) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [voter]: vote
    }));
  };

  const handleShowResults = () => {
    const voteCounts = players.reduce((acc, player) => {
      const vote = votes[player];
      if (vote) {
        acc[vote] = (acc[vote] || 0) + 1;
      }
      return acc;
    }, {});

    const maxVotes = Math.max(...Object.values(voteCounts));
    const playersWithMaxVotes = Object.keys(voteCounts).filter(player => voteCounts[player] === maxVotes);

    if (playersWithMaxVotes.length > 1) {
      setIsDraw(true);
      setVotes({});
    } else {
      setShowResults(true);
    }
  };

  if (phase === 'inform') {
    const currentPlayer = players[currentPlayerIndex];
    if (!showInfo) {
      return (
        <div className="game-container waiting-screen">
          <h2>Waiting Screen</h2>
          <p>{currentPlayer}, click the button to see your role and the word.</p>
          <button onClick={() => setShowInfo(true)}>Show Info</button>
        </div>
      );
    }
    return (
      <div className="game-container info-screen">
        <h2>Player Turn: {currentPlayer}</h2>
        <p className="info-message">Your role: {roles[currentPlayer]}</p>
        {roles[currentPlayer] === 'Mr. White' ? (
          <p className="info-message">You are Mr. White. Try to blend in with the villagers!</p>
        ) : (
          <p className="info-message">The word is: {word}</p>
        )}
        <button onClick={handleNextPlayer}>Next</button>
      </div>
    );
  }

  if (phase === 'vote' && !showResults) {
    return (
      <div className="game-container voting-screen">
        <h2>Voting Time</h2>
        {players.map((player) => (
          <div key={player}>
            <p>{player}, vote to remove a player:</p>
            {players.map((vote) => (
              <button
                key={vote}
                onClick={() => handleVoteSubmit(player, vote)}
                className={`vote-button ${votes[player] === vote ? 'selected' : ''}`}
              >
                {vote}
              </button>
            ))}
          </div>
        ))}
        {Object.keys(votes).length === players.length && (
          <button onClick={handleShowResults}>Show Results</button>
        )}
        {isDraw && <p className="result-message">There was a draw. Please vote again.</p>}
      </div>
    );
  }

  if (phase === 'vote' && showResults) {
    const voteCounts = players.reduce((acc, player) => {
      const vote = votes[player];
      if (vote) {
        acc[vote] = (acc[vote] || 0) + 1;
      }
      return acc;
    }, {});

    const votedOutPlayer = Object.keys(voteCounts).reduce((a, b) => (voteCounts[a] > voteCounts[b] ? a : b));

    return (
      <div className="game-container results-screen">
        <h2>Voting Results</h2>
        <p className="result-message">{votedOutPlayer} has been voted out.</p>
        <p className="result-message">{votedOutPlayer} was a {roles[votedOutPlayer]}.</p>
        {roles[votedOutPlayer] === 'Mr. White' ? (
          <p className="result-message">The villagers win!</p>
        ) : (
          <p className="result-message">Mr. White wins!</p>
        )}
      </div>
    );
  }

  return null;
};

export default GamePlay;
