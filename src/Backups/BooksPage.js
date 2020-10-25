import React, { useState } from 'react';
import './App.css';
import Book from "./img/1.jpeg";
import Like from "./img/like.svg";

  

function BooksPage() { 
  return(
   <div className="book-wrapper">
      <div className="book-view"> 
         <div className="book-image-wrapper" style={{backgroundImage: `url(${Book})`}}>
         </div>
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
   )
   }

export default BooksPage;