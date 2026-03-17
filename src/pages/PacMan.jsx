import { useState, useEffect, useCallback } from 'react';
import './PacMan.css';

const GRID_SIZE = 15;
const CELL_SIZE = 25;

function PacMan() {
  const [catPos, setCatPos] = useState({ x: 7, y: 7 });
  const [dots, setDots] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [direction, setDirection] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const newDots = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        if (Math.random() > 0.7 && !(x === 7 && y === 7)) {
          newDots.push({ x, y });
        }
      }
    }
    setDots(newDots);
  }, []);

  const moveCat = useCallback(() => {
    if (gameOver || (direction.x === 0 && direction.y === 0)) return;

    setCatPos(prev => {
      let newX = prev.x + direction.x;
      let newY = prev.y + direction.y;

      if (newX < 0) newX = GRID_SIZE - 1;
      if (newX >= GRID_SIZE) newX = 0;
      if (newY < 0) newY = GRID_SIZE - 1;
      if (newY >= GRID_SIZE) newY = 0;

      return { x: newX, y: newY };
    });
  }, [direction, gameOver]);

  useEffect(() => {
    const interval = setInterval(moveCat, 200);
    return () => clearInterval(interval);
  }, [moveCat]);

  useEffect(() => {
    setDots(prev => {
      const remaining = prev.filter(dot => 
        !(dot.x === catPos.x && dot.y === catPos.y)
      );
      const eaten = prev.length - remaining.length;
      if (eaten > 0) setScore(s => s + eaten * 10);
      if (remaining.length === 0) setGameOver(true);
      return remaining;
    });
  }, [catPos]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch(e.key) {
        case 'ArrowUp': setDirection({ x: 0, y: -1 }); break;
        case 'ArrowDown': setDirection({ x: 0, y: 1 }); break;
        case 'ArrowLeft': setDirection({ x: -1, y: 0 }); break;
        case 'ArrowRight': setDirection({ x: 1, y: 0 }); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const restart = () => {
    setCatPos({ x: 7, y: 7 });
    setDirection({ x: 0, y: 0 });
    setScore(0);
    setGameOver(false);
    const newDots = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        if (Math.random() > 0.7 && !(x === 7 && y === 7)) {
          newDots.push({ x, y });
        }
      }
    }
    setDots(newDots);
  };

  return (
    <div className="pacman-game">
      <h1>🐱 Cat Pac-Man</h1>
      <p className="instructions">Use arrow keys to move. Eat all the dots!</p>
      
      <div className="score-board">
        <span>Score: {score}</span>
        <span>Dots left: {dots.length}</span>
      </div>

      <div 
        className="grid"
        style={{ 
          width: GRID_SIZE * CELL_SIZE, 
          height: GRID_SIZE * CELL_SIZE 
        }}
      >
        {dots.map((dot, i) => (
          <div 
            key={i}
            className="dot"
            style={{
              left: dot.x * CELL_SIZE,
              top: dot.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE
            }}
          />
        ))}
        
        <div 
          className="cat"
          style={{
            left: catPos.x * CELL_SIZE,
            top: catPos.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
            transform: direction.x === 1 ? 'scaleX(-1)' : direction.y === -1 ? 'rotate(-90deg)' : direction.y === 1 ? 'rotate(90deg)' : 'none'
          }}
        >
          🐱
        </div>
      </div>

      {gameOver && (
        <div className="game-over">
          <h2>🎉 You Win!</h2>
          <p>Final Score: {score}</p>
          <button onClick={restart}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default PacMan;
