import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { PostReply } from '../PTweet/PostReply';
import { PostReplies } from '../PTweet/PostReplies';
import { UserContext } from '../UserContext';
import { useParams } from 'react-router-dom';
import './preply.css';

const sendReply = async (id, repid, postusid, postProfilepic, postTweet, postreplyid, postReplyPic, replyText, setReplies) => {
  try {
    const response = await axios.post('https://notatwitterbackend-2.onrender.com/generatereply', {
      pid: `${id}${repid}`,
      prompt: postTweet,
      name: [postusid, postreplyid],
      profilePic: [postProfilepic, postReplyPic],
      postReply: replyText,
    });

    setReplies(response.data.replies);
    console.log("from front end", response.data.replies);
    return response.data;
  } catch (error) {
    console.error('Error sending reply:', error.response?.data || error.message);
    throw error;
  }
};

export const PReplyhelp = () => {
  const { id, repid, name } = useParams(); // Get post id, reply id, and username from URL
  const { 
    postusid, 
    postProfilepic, 
    postTweet, 
    postreplyid, 
    postReplyPic, 
    postReply,
    username,
    getEffectiveUsername,
    getEffectiveProfilePic,
    isUserAnonymous,
    anonymousSessionId,
    currentPostOwner,
    currentPostId,
    viewingOtherPost,
    setPostOwner,
    setPostusid,
    setPostProfilepic,
    setPostTweet
  } = useContext(UserContext);
  
  const [replyText, setReplyText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [replies, setReplies] = useState([]);
  const [loadingReplies, setLoadingReplies] = useState(false);

  // Get effective values for current user (logged in or anonymous)
  const effectiveUsername = getEffectiveUsername();
  const effectiveProfilePic = getEffectiveProfilePic();

  // Determine the main post owner (the original poster)
  const mainPostOwner = currentPostOwner || {
    name: postusid,
    profilePic: postProfilepic,
    handle: postusid
  };

  // Initialize post owner information from URL if available
  useEffect(() => {
    const initializePostOwner = async () => {
      // Check if we have a username in the URL (legacy route like /:name/post/:id/:repid)
      if (name && name !== 'Anonymous' && !name.startsWith('Anonymous_')) {
        console.log('Initializing post owner from URL:', name);
        setPostusid(name);
        
        // Fetch the post content first
        try {
          const postResponse = await axios.get(`https://notatwitterbackend-2.onrender.com/post/${id}`);
          if (postResponse.data.tweet) {
            setPostTweet(postResponse.data.tweet);
          }
        } catch (postErr) {
          console.error("Error fetching post content:", postErr);
        }
        
        // Try to get profile pic for this user
        try {
          const userResponse = await axios.get(`https://notatwitterbackend-2.onrender.com/check/${name}`);
          if (userResponse.data.profilePic) {
            setPostProfilepic(userResponse.data.profilePic);
            setPostOwner(id, name, userResponse.data.profilePic, `@${name}`);
          } else {
            const defaultPic = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
            setPostProfilepic(defaultPic);
            setPostOwner(id, name, defaultPic, `@${name}`);
          }
        } catch (userErr) {
          console.error("Error fetching user profile:", userErr);
          const defaultPic = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
          setPostProfilepic(defaultPic);
          setPostOwner(id, name, defaultPic, `@${name}`);
        }
      }
    };

    if (name) {
      initializePostOwner();
    }
  }, [name, id]);

  // Fetch replies for this post when the component mounts
  useEffect(() => {
    const fetchReplies = async () => {
      setLoadingReplies(true);
      try {
        // Use the correct post owner information to construct the API endpoint
        // Priority: URL name > currentPostOwner > postusid
        let postOwnerName;
        if (name && name !== 'Anonymous' && !name.startsWith('Anonymous_')) {
          postOwnerName = name;
        } else if (currentPostOwner) {
          postOwnerName = currentPostOwner.name;
        } else {
          postOwnerName = postusid;
        }
        
        const requestId = `${postOwnerName}${repid}`;
        
        console.log(`Requesting URL: https://notatwitterbackend-2.onrender.com/generatereply/getreplies/${requestId}`);
        console.log(`Using post owner: ${postOwnerName}, from source: ${name ? 'URL' : currentPostOwner ? 'context' : 'fallback'}`);
        
        const response = await axios.get(`https://notatwitterbackend-2.onrender.com/generatereply/getreplies/${requestId}`);
        setReplies(response.data.replies);
      } catch (error) {
        console.error('Error fetching replies:', error);
        console.error('Failed to fetch replies for post owner:', name || currentPostOwner?.name || postusid);
      } finally {
        setLoadingReplies(false);
      }
    };

    if (id && repid) {
      fetchReplies();
    }
  }, [id, repid, name, currentPostOwner, currentPostId, postusid]);

  const handleTextareaChange = (e) => {
    setReplyText(e.target.value);
  };

  const handleReplySubmit = async () => {
    if (!replyText.trim()) return;

    setIsLoading(true);
    try {
      // Use effective username and profile pic for replies
      const replyUsername = username || effectiveUsername;
      const replyProfilePic = getEffectiveProfilePic();
      
      // Use the correct post owner information for sending replies
      // Priority: URL name > currentPostOwner > postusid
      let postOwnerName;
      if (name && name !== 'Anonymous' && !name.startsWith('Anonymous_')) {
        postOwnerName = name;
      } else if (currentPostOwner) {
        postOwnerName = currentPostOwner.name;
      } else {
        postOwnerName = postusid;
      }

      // Send the reply using the main post owner's information
      await sendReply(
        postOwnerName, // Use the post owner's name instead of URL id (id parameter)
        repid, // Reply ID
        mainPostOwner.name, // Original post user ID (postusid parameter)
        mainPostOwner.profilePic, // Original post profile pic (postProfilepic parameter)
        postTweet, // Original post tweet (postTweet parameter)
        replyUsername, // Current user replying (postreplyid parameter)
        replyProfilePic, // Current user's profile pic (postReplyPic parameter)
        replyText, // Reply text (replyText parameter)
        setReplies // Callback function (setReplies parameter)
      );
      setReplyText('');
    } catch (error) {
      console.error("Failed to post reply");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='space prspace'>
      {/* Main Post - Show original poster's info */}
      <PostReply 
        id={mainPostOwner.name} 
        profilePic={mainPostOwner.profilePic} 
        name={mainPostOwner.name} 
        handle={mainPostOwner.handle || `@${mainPostOwner.name}`} 
        tweet={postTweet} 
      />
      
      {/* Viewing indicator */}
      {/* {viewingOtherPost && (
        <div className="viewing-other-post">
          <p className="viewing-indicator">Viewing post by @{mainPostOwner.name}</p>
        </div>
      )}
       */}
      <p>REPLY CHAT</p>
      <ul className='replies'>
        {/* Original reply being replied to */}
        <li>
          <PostReplies
            repid={postreplyid}
            postid={id}
            id={postreplyid}
            profilePic={postReplyPic}
            name={postreplyid}
            handle={postreplyid}
            tweet={postReply}
            disabled={true}
          />
        </li>
        
        {/* All replies */}
        {loadingReplies ? (
          <p>Loading replies...</p>
        ) : replies.length > 0 ? (
          replies.map((reply, index) => (
            <li key={index}>
              <PostReplies
                repid={reply.userID}
                postid={id}
                id={reply.userID}
                profilePic={reply.profilePic}
                name={reply.userID}
                handle={reply.userID}
                tweet={reply.reply}
                disabled={false}
              />
            </li>
          ))
        ) : (
          <p></p>
        )}
        
        {/* Reply input */}
        <li className='replyingli'>
          <h1 className='replying'>
            Replying to <span className='repblue'>@{postreplyid}</span>
          </h1>
          <div className="reply-as-notice">
            {isUserAnonymous() ? (
              <div className="anonymous-info">
                <p className="anonymous-notice">Replying as {effectiveUsername}</p>
                <p className="session-info">Session: {anonymousSessionId}</p>
              </div>
            ) : (
              <div className="logged-in-info">
                <p className="user-notice">Replying as @{username}</p>
              </div>
            )}
          </div>
          <textarea
            value={replyText}
            onChange={handleTextareaChange}
            className='spacetext stextarea w-full bg-transparent text-xl placeholder-twitter-gray outline-none resize-none textarea-font'
            placeholder='Write your reply'
            rows={2}
            disabled={isLoading}
          />
          <div className='btnrepdiv'>
            <button className='spacebutton btnrep' onClick={handleReplySubmit} disabled={isLoading}>
              <p className="pspacebutton">{isLoading ? "Posting..." : "Post"}</p>
            </button>
          </div>
        </li>
      </ul>
      {isLoading && (
        <div className="loading-screen"><p>NotReplying.....</p></div>
      )}
    </div>
  );
};
