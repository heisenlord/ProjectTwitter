import React from 'react'
import { Side } from '../Side/Side';
import { Trending } from '../Trending/Trending';
import { Searcheds } from './Searcheds';
export const Search = () => {
  return (
    <div>
         <div className="main-container">
         <div className="content-wrapper">
           <Side className="sides" />
           <Searcheds/>

           <Trending className="trending" />
         </div>
       </div>
    </div>
  )
}
