import React from 'react';
import logo from './logo.svg';
import './App.css';


function Prediction() { 

  const rnd = Math.ceil(Math.random()*10)
  let predict = prompt("Write your predict", 0);
     
    let Set = rnd == predict ? <p style={{color: "green"}}>You win!</p> : <p style={{color: "red"}}>You loose!</p>
  return (
    
    <div className="App">
      <header className="App-header">
      <p>Try to predict number from 1 to 10!</p>

      <p>This time number is {rnd}</p>
      <p>Your predict is {predict}</p>
      {Set}
      </header>
      
      <img src={logo} className="App-logo" alt="logo" />
    </div>
    
  );
}

export default Prediction;
