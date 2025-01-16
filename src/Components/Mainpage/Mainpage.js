import React from 'react';

import { Side } from '../Side/Side';
import { Trending } from '../Trending/Trending';
import { Space } from '../Space/Space';

export const Mainpage = () => {
  return (
    <div>
      
      <div className='flg'>
      
      <Side className="sides"/>
      <Space/>
      <Trending/>
      </div>
     
    </div>
  )
}
