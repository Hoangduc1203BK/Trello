import './App.scss';
import Header from './components/NavBar/NavBar';
import Board_Bar from './components/Board_Bar/Board_Bar';
import Board_Column from './components/Board_Column/Board_Column';
import React from 'react';
function App() {
  return (
    <div className="App">
      <Header/>
      <Board_Bar/>
      <Board_Column/>
      </div>
      )
}

export default App;
