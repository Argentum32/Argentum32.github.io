import React, { useState, useMemo } from 'react';
import './App.css';
import Lamp from "./img/lamp.png"
import Like from "./img/like.svg";
import Liked from "./img/liked.svg";
import Box from "./img/box.png";
import {NavLink} from 'react-router-dom';


const BOOKS_PAGE = '1lxN9WC-43jwJhJsC6bJYK63wCNnjOvLSgEMwzrDbkMA'
const API_KEY = 'AIzaSyBnsI4y-0LvVLPfxRK1Iu16h-xtxKH4KRc'

function BooksPage() {
   const [books, setBooks] = useState([])
   const [favoritesBooksId, setFavoritesId] = useState(JSON.parse(localStorage.getItem('favorites')))
   const [filter, setFilter] = useState('all')
   const renderedBooks = []
   const renderedFav = []

   const getBooks = async () => {
   const respons = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${BOOKS_PAGE}/values/Books!A2:D1000?majorDimension=ROWS&key=${API_KEY}`)
   const data = await respons.json()
   setBooks(()=>{return data.values.map((book, index)=>{
      return {
         id: index + 100,
         category: book[0],
         image: book[1],
         heading: book[2],
         description: book[3],
      }
    })})
   }
   const fetchBooks = useMemo(() => getBooks(), []);

   const markup = {
      book: ({id, heading, description, image}) => {
         return (
            <div key={(id+100).toString()} className="book-wrapper book-wrapper__grid">
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
               <button className={favoritesBooksId.includes(id) ? "book-to-favorite__disabled": "book-to-favorite"} 
               dataId={id} onClick={() => setFavoritesId(prev => [...prev, id])}> 
                  <img src={favoritesBooksId.includes(id) ? Liked : Like} className="book-to-favorite-img" alt="Add to favorite"/>
                  {favoritesBooksId.includes(id) ? 'Favorite!' : 'Add to favorites'}
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
                  <td className="favorites-del" dataId={id} onClick={() => 
                  setFavoritesId(
                     favoritesBooksId.filter(listedId => listedId != id),
                     )}
                     >X</td>
               </tr>
            </table>
         )
      }
   } 
   
   const renderBooks = (books) => {
      renderedBooks.length = 0
      if (filter === 'all'){
         books.forEach((book) => {renderedBooks.push(markup.book(book))})
      } else {
         books.filter(book => book.category === filter).forEach((book) => {renderedBooks.push(markup.book(book))})
      }
   }
   renderBooks(books)

   const shownBooks = []
   const [shownBooksInPage, setShownBooksInPage] = useState(20)
   const showBooks = () => {
      for(var i=0; i<shownBooksInPage; i++){
      shownBooks.push(renderedBooks[i])
      }
      if(renderedBooks.length > shownBooksInPage) {shownBooks
         .push(<button className="load-more-btn" onClick={() => setShownBooksInPage(shownBooksInPage+20)}>Load more</button>)}
  }
  showBooks()

   const renderFavorites = () =>{renderedFav.push(favoritesBooksId.map(id => books.filter(book => book.id == id).map(book => markup.favorites(book))))}
   renderFavorites()
   
   const cachedFavorites = () => {
      localStorage.setItem('favorites', JSON.stringify(favoritesBooksId))
   }
   const creatingCache = useMemo(() => cachedFavorites(), [favoritesBooksId])

   document.body.addEventListener('click', (event) => {
      if (event.path.includes(document.querySelector('.favorites'))) {
         event.preventDefault();
         return false;
      }
       document.querySelector('.favorites-info').classList.remove('favorites-info__visible')
    })

   return(
      <div className='books'>
         <div className="header">
            <div className="header-l">
                <NavLink to="/" activeClassName='is-active'>
                <img className="back-to-home-btn" src={Lamp} alt="Back to home" />
               </NavLink>
            <div className="filters">
               <p>Choose what you love</p>
               <select className="filter" onChange={(e) => {setFilter(e.target.value)}}>
                  <option value="all">All that we love</option>
                  <option value="fantasy">Fantasy</option>
                  <option value="classics">Classics</option>
                  <option value="teen">Teen</option>
                  <option value="fiction">Fiction</option>
               </select>
               </div>
            </div>
            <div className="favorites">
               <div className="heart">
                  <div className="favorites-icon-wrapper" onClick={() => {
                     document.querySelector('.favorites-info').classList.toggle('favorites-info__visible')
                  }}>
                  <div className="count">{favoritesBooksId.length || 0}</div>  
                  <img className="favorites-icon" src={Box} alt="Favorites" />
               </div>
                  <div className="favorites-info">
                  <table className="favorites-books">
                        <tr>
                           <td className="favorites-img">Photo</td>
                           <td className="favorites-name">Book title</td>
                           <td className="favorites-del-header" onClick={() => setFavoritesId([])}>Clear</td>
                        </tr>
               </table>
                  {renderedFav} 
                  </div>
               </div>
            </div>
         </div>
         <div className="books-list">
            {shownBooks}
         </div>
      </div> 
   )
}

export default BooksPage;