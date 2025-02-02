import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Svg } from '../Post/Svg';
import { Like } from '../Post/Like';
import { Bookmark } from '../Post/Bookmark';
import { Comment } from '../Post/Comment';
import './postReplies.css';
import { UserContext } from '../UserContext';

export const PostReplies = ({repid, postid, id, profilePic, name, handle, tweet, disabled}) => {
  const { username } = useContext(UserContext);
  const navigate = useNavigate(); // Initialize useNavigate
  const { postreplyid, setPostreplyid, postReplyPic, setPostReplyPic, postReply, setPostReply } = useContext(UserContext);

  // Handle click event for navigating to the post, prevent click if disabled
  const handlePostClick = (e) => {
    console.log("handlePostClick triggered, disabled:", disabled); // Debug log
    if (disabled) {
      e.preventDefault();  // Prevent click if disabled
      console.log("Post is disabled, click prevented.");
    } else {
      setPostreplyid(name);
      setPostReplyPic(profilePic);
      setPostReply(tweet);
      navigate(`/${username}/post/${postid}/${repid}`); // Navigate to the new URL
    }
  };

  return (
    <div className="cursorpost"
      onClick={handlePostClick} 
      style={{ cursor: disabled ? "grab" : "grab" }}  // Change cursor based on disabled state
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
        </ul>
      </div>
    </div>
  );
};