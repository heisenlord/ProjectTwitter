import React from 'react';
import searchimg from '../../Assests/imgsearch.jpg';
import "./Search.css"

export const Searcheds = () => {
  return (
    <div className='space'>
        <h1 className='searchh'>&lt;NotASearch/&gt;</h1>
   <p className='pdev'><span className='engine'>Cooking</span>  Not<span className='Aspan'>A</span>Search <span className='engine'>Engine</span></p>

      <div className='imgspace'>
      <img className='searchimg bimg' src={searchimg} alt=""/>
      </div>
    </div>
  )
}
