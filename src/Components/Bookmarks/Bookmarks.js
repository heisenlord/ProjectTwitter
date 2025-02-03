import React from 'react'
import { Side } from '../Side/Side';
import { Trending } from '../Trending/Trending';
import { Bookmarkeds } from './Bookmarkeds';
export const Bookmarks = () => {
  return (
    <div className="main-container">
<div className="content-wrapper">
  <Side className="sides" />
  <Bookmarkeds/>

  <Trending className="trending" />
</div>
</div>

  )
}

