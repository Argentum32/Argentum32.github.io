import React from 'react';
import './App.css';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import BooksPage from './BooksPage'
import Home from './Home'


function App() {
   return  (
      <BrowserRouter > 
          <Switch>
          <Route path="/"  component={Home} exact={true}/>
          <Route path="/books" component={BooksPage}  />
          </Switch>
      </BrowserRouter>)
}

export default App;