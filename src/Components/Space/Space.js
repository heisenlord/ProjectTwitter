import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import profilpp from "../../Components/Profile/profilepics/profilepic1.jpeg";
import { PostItem } from "../Post/Post";
import { Post } from "../Post/Post";
import "./space.css";
import { UserContext } from '../UserContext';

export const Space = () => {
  const { 
    username, 
    profilePic, 
    pp, 
    getEffectiveUsername, 
    getEffectiveProfilePic,
    isUserAnonymous,
    isLoggedIn,
    anonymousSessionId,
    clearPostOwner
  } = useContext(UserContext);
  
  const { name } = useParams(); // Keep for legacy support
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 

  // Get effective values for current user (logged in or anonymous)
  const effectiveUsername = getEffectiveUsername();
  const effectiveProfilePic = getEffectiveProfilePic();

  // Determine which user feed to show
  const feedUsername = isLoggedIn ? username : (name || effectiveUsername);

  // Clear post owner context when viewing main feed
  useEffect(() => {
    clearPostOwner();
  }, [clearPostOwner]);

  // Fetch posts when component mounts or when user changes
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Try to fetch user-specific posts first
        let response;
        if (isLoggedIn && username) {
          response = await axios.get(`https://notatwitterbackend-2.onrender.com/posts/byname/${username}`);
        } else if (name && name !== 'Anonymous' && !name.startsWith('Anonymous_')) {
          response = await axios.get(`https://notatwitterbackend-2.onrender.com/posts/byname/${name}`);
        } else {
          // For anonymous users or when no specific user, get general feed
          response = await axios.get(`https://notatwitterbackend-2.onrender.com/posts/byname/general`);
        }
        
        if (response.data && Array.isArray(response.data)) {
          const reversedPosts = response.data.reverse();
          setPosts(reversedPosts);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      }
    };

    fetchPosts();
  }, [username, name, isLoggedIn]);

  const handlePostClick = async () => {
    if (postContent.trim() === "") {
      alert("Post cannot be empty");
      return;
    }
  
    setIsLoading(true);
    const postId = uuidv4();
    
    // Use effective username for posting (either logged in user or Anonymous)
    const postingUsername = isLoggedIn ? username : effectiveUsername;
    const postingProfilePic = effectiveProfilePic;
  
    try {
      const response = await axios.post("https://notatwitterbackend-2.onrender.com/generate", {
        prompt: postContent,
        pid: postId,
        name: postingUsername, 
        profilePic: postingProfilePic
      });
  
      console.log("Post successful:", response.data);
  
      // Add new post to the posts array dynamically
      const newPost = {
        id: postId,
        profilePic: postingProfilePic,
        name: postingUsername,
        handle: `@${postingUsername}`,
        tweet: postContent,
      };
  
      setPosts([newPost, ...posts]);
      setPostContent("");
  
      // Navigate to the new post's page after successful submission
      navigate(`/post/${postId}`);
    } catch (error) {
      console.error("Error posting content:", error);
      if (isLoggedIn) {
        navigate("/home");
      } else {
        navigate("/");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space">
      <div className="typepost">
        <ul className="typepostul">
          <li className="typepostli">
            <img className="sideimgpp pp imgpp" src={effectiveProfilePic || profilpp} alt="Profile" />
          </li>
          <li className="typepostli textareali">
            <textarea
              className="spacetext stextarea w-full bg-transparent text-xl placeholder-twitter-gray outline-none resize-none textarea-font"
              placeholder="What's not happening?"
              rows={3}
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
          </li>
        </ul>
        <button
          className="spacebutton"
          onClick={handlePostClick}
          disabled={isLoading}
        >
          <p className="pspacebutton">{isLoading ? "Posting..." : "NotPost"}</p>
        </button>
        {isUserAnonymous() && (
          <div className="anonymous-info">
            <p className="anonymous-notice" style={{display: 'none'}}>Posting as {effectiveUsername}</p>
            <p className="session-info">Session: {anonymousSessionId}</p>
          </div>
        )}
        {/* {isLoggedIn && (
          <div className="logged-in-info">
            <p className="user-notice">Posting as @{username}</p>
          </div>
        )} */}
      </div>
      <div className="line"></div>

      {/* Show loading indicator */}
      {isLoading && <div className="loading-screen"><p>NotPosting.....</p></div>}

      {/* Show current feed info */}
      {/* <div className="feed-info">
        {isLoggedIn ? (
          <p className="feed-header"> - @{username}</p>
        ) : (
          <p className="feed-header">Public Feed</p>
        )}
      </div> */}

      {/* Render all posts dynamically */}
      <div className="postmain">
        {posts.map((post) => (
          <PostItem
            key={post.id}
            id={post.id}
            profilePic={post.profilePic}
            name={post.name}
            handle={post.handle}
            tweet={post.tweet}
          />
        ))}
      </div>

      <Post />
    </div>
  );
};
