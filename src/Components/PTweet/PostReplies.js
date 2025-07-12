import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Svg } from '../Post/Svg';
import { Like } from '../Post/Like';
import { Bookmark } from '../Post/Bookmark';
import { Comment } from '../Post/Comment';
import { Share } from '../Post/Share';
import './postReplies.css';
import { UserContext } from '../UserContext';

export const PostReplies = ({repid, postid, id, profilePic, name, handle, tweet, disabled}) => {
  const { 
    username, 
    getEffectiveUsername,
    isLoggedIn,
    postreplyid, 
    setPostreplyid, 
    postReplyPic, 
    setPostReplyPic, 
    postReply, 
    setPostReply,
    currentPostOwner,
    setPostOwner
  } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle click event for navigating to the reply
  const handlePostClick = (e) => {
    console.log("handlePostClick triggered, disabled:", disabled);
    if (disabled) {
      e.preventDefault();
      console.log("Post is disabled, click prevented.");
    } else {
      // Set the reply information
      setPostreplyid(name);
      setPostReplyPic(profilePic);
      setPostReply(tweet);
      
      // Maintain the original post owner context when navigating to replies
      // This ensures we remember whose post we're viewing when going deeper into reply chains
      if (currentPostOwner) {
        // We're already viewing someone else's post, keep that context
        console.log("Maintaining post owner context:", currentPostOwner.name);
      } else {
        // This shouldn't happen if we're clicking from within a post view, but just in case
        console.log("No current post owner found, this may cause issues");
      }
      
      // Navigate to reply without user-specific URL
      navigate(`/post/${postid}/${repid}`);
    }
  };

  return (
    <div className="cursorpost"
      onClick={handlePostClick} 
      style={{ cursor: disabled ? "grab" : "grab" }}
    >
      <div className="prpost post">
        <img className="sideimgpp replypic" src={profilePic} alt={`${name}'s profile`} />
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
          <li><Share postId={id} postContent={tweet} postAuthor={name} postAuthorHandle={handle} /></li>
        </ul>
      </div>
    </div>
  );
};