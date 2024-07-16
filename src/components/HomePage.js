import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <h1>Welcome to Game Center</h1>
      <div className="card-container">
        <Link to="/ticky" className="card">
          Ticky
        </Link>
        <Link to="/undercover" className="card">
          Undercover
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
