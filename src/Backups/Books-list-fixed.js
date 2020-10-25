import React, { useState } from 'react';
import './App.css';
import Book from "./img/1.jpeg";
import Like from "./img/like.svg";

  

function App() { 
  return(
<div>
      <div className="filters">
         <div className="filter">
            <p>Choose what you love</p>
         <select name="category" id="category-select" className="categories">
            <option value="#">Adventures</option>
            <option value="#">Detectives</option>
            <option value="#">Romans</option>
         </select>
         </div>
      </div>
     <div className="books-list">
         <div className="book-wrapper book-wrapper__grid">
               <div className="book-image-wrapper" style={{backgroundImage: `url(${Book})`}}>
            </div>
            <h3 className="book-heading">
               Any book
            </h3>
            <div className="book-description">
               Something about this book
            </div>
            <button className="book-to-favorite">
               <img src={Like} className="book-to-favorite-img" alt="Add to favorite"/>
               Add to favorite
            </button>
         </div>
         <div className="book-wrapper book-wrapper__grid">
               <div className="book-image-wrapper" style={{backgroundImage: `url(${Book})`}}>
            </div>
            <h3 className="book-heading">
               Any book
            </h3>
            <div className="book-description">
               Something about this book
            </div>
            <button className="book-to-favorite">
               <img src={Like} className="book-to-favorite-img" alt="Add to favorite"/>
               Add to favorite
            </button>
         </div>
         <div className="book-wrapper book-wrapper__grid">
               <div className="book-image-wrapper" style={{backgroundImage: `url(${Book})`}}>
            </div>
            <h3 className="book-heading">
               Any book
            </h3>
            <div className="book-description">
               Something about this book
            </div>
            <button className="book-to-favorite">
               <img src={Like} className="book-to-favorite-img" alt="Add to favorite"/>
               Add to favorite
            </button>
         </div>
   </div>
</div> 
   )
   }

export default App;


