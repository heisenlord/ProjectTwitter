import React, { useState } from "react";
import "./space.css";
import profilpp from "../../Assests/ProfilePic.jpg";
import { PostItem } from "../Post/Post"; // Import PostItem for dynamic posts
import { Post } from "../Post/Post";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // Import UUID for unique IDs
import { useNavigate } from "react-router-dom"; // Import useNavigate

export const Space = () => {
  const [postContent, setPostContent] = useState(""); // For new post input
  const [posts, setPosts] = useState([]); // To hold all posts
  const [isLoading, setIsLoading] = useState(false); // Loading state for the button
  const navigate = useNavigate(); // Initialize the navigate hook

  const handlePostClick = async () => {
    if (postContent.trim() === "") {
      alert("Post cannot be empty");
      return;
    }

    setIsLoading(true); // Set loading state to true
    const postId = uuidv4(); // Generate a unique ID for the post

    try {
      const response = await axios.post("http://localhost:3000/generate", {
        prompt: postContent,
        pid: postId, // Send the ID along with the prompt
      });

      console.log("Post successful:", response.data);

      // Add the new post to the posts array
      const newPost = {
        id: postId,
        profilePic: profilpp, // Default profile picture
        name: "You", // Replace with the user's name dynamically
        handle: "@your_handle", // Replace with the user's handle dynamically
        tweet: postContent,
      };

      setPosts([newPost, ...posts]); // Add the new post at the top
      setPostContent(""); // Clear the textarea

      // Navigate to the new post's page after successful submission
      navigate(`/post/${postId}`);
    } catch (error) {
      console.error("Error posting content:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false); // Set loading to false after the post request
    }
  };

  return (
    <div className="space">
      <div className="typepost">
        <ul className="typepostul">
          <li className="typepostli">
            <img className="sideimgpp pp" src={profilpp} alt="Profile" />
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
          disabled={isLoading} // Disable the button when loading
        >
          <p className="pspacebutton">{isLoading ? "Posting..." : "NotPost"}</p>
        </button>
      </div>
      <div className="line"></div>

      {/* Show loading indicator */}
      {isLoading && (
        <div className="loading-screen">
          <p>NotPosting.....</p>
        </div>
      )}

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

      {/* Additional Post component */}
      <Post />
    </div>
  );
};
