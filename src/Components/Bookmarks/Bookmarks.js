import React from 'react'
import { Side } from '../Side/Side';
import { Trending } from '../Trending/Trending';
import { Bookmarkeds } from './Bookmarkeds';
export const Bookmarks = () => {
  return (
    <div><div className='flg'>
                            
                            <Side className="sides"/>
                           <Bookmarkeds/>
                            <Trending/>
                            </div>
                            </div>
  )
}
