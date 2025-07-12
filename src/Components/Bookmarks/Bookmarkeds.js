import React from 'react'
import bookmarkImg from "../../Assests/bb-3.webp";
import "./Bookmark.css"
export const Bookmarkeds = () => {
  return (
     <div className='space'>
           <h1 className='searchh'>&lt;NotABookmark/&gt;</h1>
           <p className='pdev'><span className='engine'>Cooking</span>  Not<span className='Aspan'>A</span>Bookmark <span className='engine'>Lib</span></p>
   
         <div className='imgspace'>
         <img className='searchimg bimg' src={bookmarkImg} alt=""/>
         </div>
       </div>
  )
}
