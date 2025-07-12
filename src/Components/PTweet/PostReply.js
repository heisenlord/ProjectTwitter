import React from 'react';
import { Svg } from '../Post/Svg';
import { Like } from '../Post/Like';
import { Bookmark } from '../Post/Bookmark';
import { Comment } from '../Post/Comment';

export const PostReply = ({ id, profilePic, name, handle, tweet }) => {

  return (
    <div>
  
  <div >

    <div  className="post" >
  
      <img className="sideimgpp imgpp" src={profilePic} alt={`${name}'s profile`} />
 

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
export const PostReplyothers = ({ id, profilePic, name, handle, tweet }) => {

  return (
    <div>
  
  <div >

    <div  className="post" >
  
      <img id="imgfor" className="sideimgpp imgpp" src={profilePic} alt={`${name}'s profile`} />
 

      <div className="postcontent">
        <h4 className="name">
          {name} <span className="blue-tick"><Svg /></span> <span className="id">@{handle}</span>
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

