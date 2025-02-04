import React from 'react';
import { Side } from '../Side/Side';
import { Trending } from '../Trending/Trending';

import { Pdummyhelp } from './Pdummyhelp';
export const Postdummy = () => {
  return (
    <div className="main-container">
    <div className="content-wrapper">
      <Side className="sides" />
    <div className="space pdummyhelp"> <Pdummyhelp /></div>
    
   

      <Trending className="trending" />
    </div>
  </div>
  )
}

