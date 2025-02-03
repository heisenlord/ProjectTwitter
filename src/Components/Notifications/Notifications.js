import React from 'react'
import { Side } from '../Side/Side';
import { Trending } from '../Trending/Trending';
import { Notificationseds } from './Notificationseds';
export const Notifications = () => {
  return (
    <div className="main-container">
         <div className="content-wrapper">
           <Side className="sides" />
           <Notificationseds/>

           <Trending className="trending" />
         </div>
       </div>
  )
}
