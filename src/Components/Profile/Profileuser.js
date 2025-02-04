import React from 'react'
import { Side } from '../Side/Side';
import { Trending } from '../Trending/Trending';
import { Profileselect } from './Profileselect';
import { Profileds } from './Profileds';
export const Profileuser = () => {
  return (
    <div className="main-container">
    <div className="content-wrapper">
      <Side  />
      <Profileselect/>

      <Trending className="trending" />
    </div>
  </div>
  )
}

