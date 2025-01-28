import React from 'react';
import { Svg } from '../Post/Svg';
import { Like } from '../Post/Like';
import { Bookmark } from '../Post/Bookmark';
import { Comment } from '../Post/Comment';
import tt1 from '../../Assests/tt1.jpg'
import './postReplies.css';
export const PostReplies = ({ id, profilePic, name, handle, tweet }) => {
     

  return (
    <div>
  
  <div >

    <div  className="prpost post" >
  
      <img className=" sideimgpp" src={profilePic} alt={`${name}'s profile`} />
 

      <div className="postcontent">
        <h4 className="name">
          {name} <span className="blue-tick"><Svg /></span> <span className="id">{handle}</span>
        </h4>
        <h1 className="tweet">{tweet}</h1>
      </div>
 
    </div>
    <div className="postreactions">
      <ul className="postreactionsul">
        <li><Comment /></li>
        <li><Bookmark /></li>
        <li><Like /></li>
      </ul>
    </div>


  </div>


    </div>
  )
}
