import React from 'react';
import { Side } from '../Side/Side';
import { Trending } from '../Trending/Trending';
import { PReplyhelp } from './PReplyhelp';

export const PReply = () => {
  return (
    <div className="main-container">
         <div className="content-wrapper">
           <Side className="sides" />
           <PReplyhelp/>

           <Trending className="trending" />
         </div>
       </div>
  )
}

