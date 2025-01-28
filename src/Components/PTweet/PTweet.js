
import React from 'react'
import { Side } from '../Side/Side';
import { Trending } from '../Trending/Trending';
import { PSpace } from './PSpace';
import './PTweet.css';

export const PTweet = () => {
  return (
    <div>
        <div className='flg'>
                    
                    <Side className="sides"/>
                    <div className='space'>
                   <PSpace  />
                   </div>
                    <Trending/>
                </div>
    </div>
  )
}
