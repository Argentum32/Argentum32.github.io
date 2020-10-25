import React, { useState } from 'react';
import './App.css';
import HarryPotter from "./img/1.jpeg";
import TheArtofWar from "./img/2.jpg";
import FightClub from "./img/3.png";
import Like from "./img/like.svg";
import Box from "./img/box.png"



function App() {
   const books = [{
      id: 10000,
      category: 'adventure',
      image: HarryPotter,
      heading: "Harry Potter",
      description: 'Throughout the series, Harry is described as having his father\'s perpetually untidy black hair, his mother\'s bright green eyes, and a lightning bolt-shaped scar on his forehead. He is further described as "small and skinny for his age" with "a thin face" and "knobbly knees", and he wears round eyeglasses.'
   }, {
      id: 10001,
      category: 'detective',
      image: TheArtofWar,
      heading: "The art of war",
      description: 'The Art of War is an ancient Chinese military treatise dating from the Late Spring and Autumn Period (roughly 5th century BC). The work, which is attributed to the ancient Chinese military strategist Sun Tzu ("Master Sun", also spelled Sunzi), is composed of 13 chapters.'
   }, {
      id: 10002,
      category: 'roman',
      image: FightClub,
      heading: "Fight club",
      description: 'Fight Club is a 1996 novel by Chuck Palahniuk. It follows the experiences of an unnamed protagonist struggling with insomnia. Inspired by his doctor\'s exasperated remark that insomnia is not suffering, the protagonist finds relief by impersonating a seriously ill person in several support groups.'
   }
   ]
   
   const markup = {
      book: ({id, heading, description, image}) => {
         return (
         <div className="book-wrapper book-wrapper__grid">
            <div className="book-info">
               <div className="book-image-wrapper" style={{backgroundImage: `url(${image})`}}>
               </div>
               <h3 className="book-heading">
                  {heading}
               </h3>
               <div className="book-description">
                  {description}
               </div>
            </div>
            <button className="book-to-favorite" dataId={id} onClick={() => setFavorites(
                  favoritesBooks => [...favoritesBooks,
                  books.filter(book => book.id === id).map(book => markup.favorites(book))],
                  JSON.parse(localStorage.favoritesBooks || '[]')
            )}> 
               <img src={Like} className="book-to-favorite-img" alt="Add to favorite"/>
               Add to favorite
            </button>
         </div>
         )
      },
      favorites: ({id, heading, image}) => {
         return(
               <table className="favorites-books">
                        <tr>
                           <td className="favorites-img"><img className="favorites-img-img" src={image}/></td>
                           <td className="favorites-name">{heading}</td>
                           <td className="favorites-del" dataId={id} onClick={() => setFavorites(
                              favoritesBooks.filter(book => book.id != id).map(book => markup.favorites(book)),
                              console.log(favoritesBooks) // how to get ID from arr of Objects?
                           )}>X</td>
                        </tr>
               </table>
         )
      }
   } 
   
   const [favoritesBooks, setFavorites] = useState([])
   const [filter, setFilter] = useState('all')

   console.log(filter) // double rendering

   const renderedBooks = []

   
   const renderBooks = (books) => {
      renderedBooks.length = 0
      if (filter === 'all'){
         books.forEach((book) => {
            renderedBooks.push(markup.book(book))
         })
      }
      if (filter === 'adventure'){
         books.filter(book => book.category === 'adventure').forEach((book) => {
            renderedBooks.push(markup.book(book))
         })
      }
      if (filter === 'detective'){
        books.filter(book => book.category === 'detective').forEach((book) => {
            renderedBooks.push(markup.book(book))
         })
      }
      if (filter === 'roman'){
         books.filter(book => book.category === 'roman').forEach((book) => {
            renderedBooks.push(markup.book(book))
         })
      }
   }

   document.body.addEventListener('click', (event) => {
      if (event.path.includes(document.querySelector('.favorites'))) {
         event.preventDefault();
         return false;
      }
       document.querySelector('.favorites-info').classList.remove('favorites-info__visible')
    })

   // const renderFavorites = () => {
   //    const favoritesBooks = JSON.parse(localStorage.favoritesBooks || '[]')
   //    document.getElementsByClassName('.favorites').innerHTML = markup.favorites(favoritesBooks)
   // }
   
   renderBooks(books)

  return(
     
      <div>
         <div className="header">
            <div className="filters">
               <p>Choose what you love</p>
               <select className="filter" onChange={(e) => {setFilter(e.target.value)}}>
                  <option value="all">All that we love</option>
                  <option value="adventure">Adventures</option>
                  <option value="detective">Detectives</option>
                  <option value="roman">Romans</option>
               </select>
            </div>
            <div className="favorites">
               <div className="heart">
                  <div className="favorites-icon-wrapper" onClick={() => {
                     document.querySelector('.favorites-info').classList.toggle('favorites-info__visible')
                  }}>
                  <div className="count">{favoritesBooks.length || 0}</div>  
                  <img className="favorites-icon" src={Box} alt="Favorites" />
               </div>
                  <div className="favorites-info">
                  <table className="favorites-books">
                        <tr>
                           <td className="favorites-img">Photo</td>
                           <td className="favorites-name">Book title</td>
                           <td className="favorites-del">Del</td>
                        </tr>
               </table>
                  {favoritesBooks} 
                  </div>
               </div>
            </div>
         </div>
         <div className="books-list">
            {renderedBooks}
         </div>
      </div> 
   )
}

export default App;