import React from 'react';
import { Side } from '../Side/Side';
import { Trending } from '../Trending/Trending';

import { Pdummyhelp } from './Pdummyhelp';
export const Postdummy = () => {
  return (
    <div>
        <div className='flg'>
                            
                            <Side className="sides"/>
                            <div className='space'>
                           <Pdummyhelp />
                           </div>
                            <Trending/>
        
                            </div>
        
    </div>
  )
}
