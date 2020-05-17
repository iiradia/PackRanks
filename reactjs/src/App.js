import React from 'react';
//import './App.css';
import Navbar from './components/Navbar';
import FirstPrompt from './components/FirstPrompt';
import MainWelcome from './components/MainWelcome';
/**
 * App.js organizes all components to be rendered and exports them to index.js. 
 */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <MainWelcome />
        <FirstPrompt />
      </header>
    </div>
  );
}

export default App;
