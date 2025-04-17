import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [cookies, setCookies] = useState(0);
  const [autoClickers, setAutoClickers] = useState(0);

  // Auto-clicker logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCookies(prev => prev + autoClickers);
    }, 1000);
    return () => clearInterval(interval);
  }, [autoClickers]);

  const handleClick = () => {
    setCookies(cookies + 1);
  };

  const buyAutoClicker = () => {
    if (cookies >= 10) {
      setCookies(cookies - 10);
      setAutoClickers(autoClickers + 1);
    }
  };

  return (
    <div className="App">
      <h1>Cookie Clicker</h1>
      <p>You have <strong>{cookies}</strong> cookies</p>
      <p>Auto-clickers: {autoClickers}</p>

      {/* Clickable cookie image */}
      <img
        src="/pink-cookie.jpg"
        alt="cookie"
        onClick={handleClick}
        style={{
          width: '200px',
          height: '200px',
          cursor: 'pointer',
          transition: 'transform 0.1s',
        }}
        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
      />

      <br /><br />

      <button onClick={buyAutoClicker}>
        Buy Auto-Clicker (10 cookies)
      </button>
    </div>
  );
}

export default App;
