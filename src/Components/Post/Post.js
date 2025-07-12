import React, { useContext } from "react";
import './post.css';
import tt1 from '../../Assests/tt1.jpg';
import tt2 from '../../Assests/dhtfi_pp.jpg';
import tt3 from '../../Assests/tt3.jpg';
import { Svg } from './Svg';
import { Like } from './Like';
import { Bookmark } from './Bookmark';
import { Comment } from './Comment';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../UserContext';

const postsData = [
  {
    id: 1,
    profilePic: tt1,
    name: 'BOBjr',
    handle: '@not_hillbilly_boi',
    tweet: `Finally, a platform where you'll always get a response. Post anything, and Einstein might explain it, Shakespeare might rhyme it, or Gordon Ramsay might roast it. Conversations guaranteed, validation optional.`,
  },
  {
    id: 2,
    profilePic: tt2,
    name: 'DHTFI',
    handle: '@alwaysNotOnSpeak',
    tweet: `Tired of your tweets going unnoticed? On notATwitter, every post gets a reply. Yes, even your hot take on pineapple pizza will get a response. Welcome to a world where silence is never an option.`,
  },
  {
    id: 3,
    profilePic: tt3,
    name: 'Neeru....🚬',
    handle: '@notChokkaku',
    tweet: `Social media is exhausting when nobody replies, right? On notATwitter, every post sparks a conversation. Whether it's your random thoughts or groundbreaking ideas, someone (or something 👀) is ready to engage.`,
  },
];

// Reusable PostItem Component
export const PostItem = ({ id, profilePic, name, handle, tweet }) => {
  const navigate = useNavigate();
  const { username, getEffectiveUsername, isLoggedIn, setPostOwner } = useContext(UserContext);
  
  const handlePostClick = () => {
    // Save post owner information in context
    setPostOwner(id, name, profilePic, handle);
    
    // Navigate to post without user-specific URL
    navigate(`/post/${id}`);
  };

  return (
  <div >

    <div onClick={handlePostClick} className="post" >
  
      <img className="sideimgpp" src={profilePic} alt={`${name}'s profile`} />
 

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
    <div className="line"></div>

  </div>

);
};

export const PostOthers = ({ id, profilePic, name, handle, tweet }) => {
  const navigate = useNavigate();
  const { username, getEffectiveUsername, isLoggedIn, setPostOwner } = useContext(UserContext);

  const handlePostClick = () => {
    // Save post owner information in context
    setPostOwner(id, name, profilePic, handle);
    
    // Navigate to post without user-specific URL
    navigate(`/post/${id}`);
  };

  return (
  <div >

    <div onClick={handlePostClick} className="post" >
  
      <img className="sideimgpp" src={profilePic} alt={`${name}'s profile`} />
 

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
    <div className="line"></div>

  </div>

);
};

// Main Post Component
export const Post = () => {
  return (
    <div className="postmain">
      {postsData.map((post) => (
        <PostOthers
          key={post.id}
          id={post.id}
          profilePic={post.profilePic}
          name={post.name}
          handle={post.handle}
          tweet={post.tweet}
        />
      ))}
    </div>
  );
};
