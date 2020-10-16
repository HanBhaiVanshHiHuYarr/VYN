import React from 'react';
import './App.css';

import Dashboard from './Dashboard'
import Store from './Store'


function App() {
  return (
    <div className="App" >
      <header className="App-header">
        <Store>
          <Dashboard/>
        </Store>
        
      </header>
    </div>
  );
}

export default App;
