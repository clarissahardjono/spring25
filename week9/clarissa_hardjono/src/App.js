import React, { useState } from 'react';
import './App.css';

function App() {
  const [cookies, setCookies] = useState(0);

  const handleClick = () => {
    setCookies(cookies + 1);
  };

  return (
    <div className="App">
      <h1>🍪 Cookie Clicker</h1>
      <p>You have <strong>{cookies}</strong> cookies!</p>
      <button onClick={handleClick}>Click me!</button>
    </div>
  );
}

export default App;
