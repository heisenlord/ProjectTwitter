import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom"; // Import hooks
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import profilpp from "../../Components/Profile/profilepics/profilepic1.jpeg";
import { PostItem } from "../Post/Post";
import { Post } from "../Post/Post";
import "./space.css";
import { UserContext } from '../UserContext';

export const Space = () => {
  const { username, profilePic,pp } = useContext(UserContext);
  const { name="test" } = useParams(); 
  // Extract name from the URL
  const [postContent, setPostContent] = useState(""); // For new post input
  const [posts, setPosts] = useState([]); // To hold all posts
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const location = useLocation(); 

  // Fetch posts when component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`https://notatwitterbackend-2.onrender.com/posts/byname/${name}`);
        const reversedPosts = response.data.reverse();
        setPosts(reversedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [name]); // Re-run when name changes

  const handlePostClick = async () => {
    if (postContent.trim() === "") {
      alert("Post cannot be empty");
      return;
    }
  
    setIsLoading(true); // Set loading state to true
    const postId = uuidv4(); // Generate a unique ID for the post
  
    try {
      const response = await axios.post("https://notatwitterbackend-2.onrender.com/generate", {
        prompt: postContent,
        pid: postId,
        name: name, 
        profilePic:profilePic||pp
      });
  
      console.log("Post successful:", response.data);
  
      // Add new post to the posts array dynamically
      const newPost = {
        id: postId,
        profilePic: profilePic||pp,
        name: name,
        handle: `@${name}`,
        tweet: postContent,
      };
  
      setPosts([newPost, ...posts]); // Add new post at the top
      setPostContent(""); // Clear the textarea
  
      // Navigate to the new post's page after successful submission
      navigate(`${location.pathname}/post/${postId}`);
    } catch (error) {
      console.error("Error posting content:", error);
      navigate("/")
      // alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false); // Set loading to false
    }
  };

  return (
    <div className="space">
      <div className="typepost">
        <ul className="typepostul">
          <li className="typepostli">
            <img className="sideimgpp pp imgpp" src={profilePic||pp||profilpp} alt="Profile" />
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
       { username?(<p></p>):(<p>login/signup to continue</p>)}
      </div>
      <div className="line"></div>

      {/* Show loading indicator */}
      {isLoading && <div className="loading-screen"><p>NotPosting.....</p></div>}

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
