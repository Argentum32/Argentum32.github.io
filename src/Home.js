import React, { useState } from 'react';
import lamp from './img/lamp.png';
import './App.css';
import {NavLink, BrowserRouter} from 'react-router-dom';


function Home() {

  const [on, toggleSwitch] = useState(!true)

   return (
    <div className="App">
      <header className="App-header">

        {on ? <NavLink to="/books" activeClassName='is-active'>
           <button className="portal">Just read something interesting</button>
           </NavLink> : <div><br/></div>}

        {on ? <p className="on">The lamp is on</p> : <p className="off">The lamp is off</p>}

        <img className="lamp" onClick={()=>toggleSwitch(!on)} src={lamp} alt="Here might be a lamp" />

        {on ? <p className="on">But you even can turn it off</p> : <p className="off"> Just turn it on</p>}

      </header>
      <div className='favorites-info'></div>
    </div>
    
  )
}

export default Home;


