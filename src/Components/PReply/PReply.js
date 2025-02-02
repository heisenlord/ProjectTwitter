import React from 'react';
import { Side } from '../Side/Side';
import { Trending } from '../Trending/Trending';
import { PReplyhelp } from './PReplyhelp';

export const PReply = () => {
  return (
    <div>
        <div className='flg'>
                    
                    <Side className="sides"/>
                   <PReplyhelp/>
                    <Trending/>

                    </div>

    </div>
  )
}
