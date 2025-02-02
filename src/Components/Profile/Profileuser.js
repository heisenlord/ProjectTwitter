import React from 'react'
import { Side } from '../Side/Side';
import { Trending } from '../Trending/Trending';
import { Profileselect } from './Profileselect';
import { Profileds } from './Profileds';
export const Profileuser = () => {
  return (
    <div>
      <div className='flg'>
            
            <Side className="sides"/>
           <Profileselect/>
            <Trending/>
            </div>
    </div>
  )
}
