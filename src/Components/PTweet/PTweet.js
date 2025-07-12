
import React from 'react'
import { Side } from '../Side/Side';
import { Trending } from '../Trending/Trending';
import { PSpace } from './PSpace';
import './PTweet.css';

export const PTweet = () => {
  return (
    <div>
            <div className="main-container">
            <div className="content-wrapper">
              <Side className="sides" />
              <div className='space spaceh'>
<PSpace  />
</div>
   
              <Trending className="trending" />
            </div>
          </div>
       </div>
  )
}

 
