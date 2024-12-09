import React, { useState, useEffect } from 'react';
import Hangman from './Hangman';
import './HangmanGame.css'; // Import the CSS file

const HangmanGame = () => {
  const words = ['react', 'javascript', 'frontend', 'hangman', 'programming'];
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [attempts, setAttempts] = useState(6);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
  }, []);

  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter) || gameOver) return;

    setGuessedLetters([...guessedLetters, letter]);

    if (!word.includes(letter)) {
      setAttempts((prevAttempts) => prevAttempts - 1);
    }

    if (attempts === 1) {
      setMessage(`Game Over! The word was: ${word}`);
      setGameOver(true);
    } else if (word.split('').every((char) => guessedLetters.includes(char) || char === letter)) {
      setMessage('Congratulations! You guessed the word!');
      setGameOver(true);
    }
  };

  const displayWord = word
    .split('')
    .map((letter) => (guessedLetters.includes(letter) ? letter : '_'))
    .join(' ');

  return (
    <div className="hangman-container">
      <h1 className="title">Hangman Game</h1>
      <Hangman attempts={attempts} />
      <h3 className="word-display">{displayWord}</h3>
      <p className="attempts">Attempts remaining: {attempts}</p>
      <p className={`message ${gameOver ? 'game-over' : 'success'}`}>{message}</p>

      {!gameOver && (
        <div className="letters-container">
          {'abcdefghijklmnopqrstuvwxyz'.split('').map((letter) => (
            <button
              key={letter}
              onClick={() => handleGuess(letter)}
              disabled={guessedLetters.includes(letter)}
              className={`letter-btn ${guessedLetters.includes(letter) ? 'disabled' : ''}`}
            >
              {letter}
            </button>
          ))}
        </div>
      )}

      {gameOver && (
        <button className="restart-btn" onClick={() => window.location.reload()}>
          Restart Game
        </button>
      )}
    </div>
  );
};

export default HangmanGame;
