import React from 'react'
import { Side } from '../Side/Side';
import { Trending } from '../Trending/Trending';
import { Searcheds } from './Searcheds';
export const Search = () => {
  return (
    <div>
        <div className='flg'>
                        
                        <Side className="sides"/>
                       <Searcheds/>
                        <Trending/>
                        </div>
    </div>
  )
}
