import React from 'react';
import './HangmanGame.css';

const Hangman = ({ attempts }) => {
  return (
    <div className="hangman-display">
      <svg height="250" width="200" className="hangman-svg">
        {/* Base */}
        <line x1="10" y1="230" x2="150" y2="230" stroke="#000" strokeWidth="4" />
        {/* Pole */}
        <line x1="80" y1="230" x2="80" y2="20" stroke="#000" strokeWidth="4" />
        <line x1="80" y1="20" x2="140" y2="20" stroke="#000" strokeWidth="4" />
        <line x1="140" y1="20" x2="140" y2="40" stroke="#000" strokeWidth="4" />

        {/* Head */}
        {attempts <= 5 && (
          <circle cx="140" cy="60" r="20" stroke="#000" strokeWidth="4" fill="none" />
        )}
        {/* Body */}
        {attempts <= 4 && (
          <line x1="140" y1="80" x2="140" y2="140" stroke="#000" strokeWidth="4" />
        )}
        {/* Left Arm */}
        {attempts <= 3 && (
          <line x1="140" y1="100" x2="120" y2="120" stroke="#000" strokeWidth="4" />
        )}
        {/* Right Arm */}
        {attempts <= 2 && (
          <line x1="140" y1="100" x2="160" y2="120" stroke="#000" strokeWidth="4" />
        )}
        {/* Left Leg */}
        {attempts <= 1 && (
          <line x1="140" y1="140" x2="120" y2="180" stroke="#000" strokeWidth="4" />
        )}
        {/* Right Leg */}
        {attempts === 0 && (
          <line x1="140" y1="140" x2="160" y2="180" stroke="#000" strokeWidth="4" />
        )}
      </svg>
    </div>
  );
};

export default Hangman;
