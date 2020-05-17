import React from 'react';
//import './App.css';
import Navbar from './components/Navbar';
import FirstPrompt from './components/FirstPrompt';
/**
 * App.js organizes all components to be rendered and exports them to index.js. 
 */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <FirstPrompt />
      </header>
    </div>
  );
}

export default App;
