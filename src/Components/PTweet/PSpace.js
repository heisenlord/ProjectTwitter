import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { PostReply } from "./PostReply";
import { PostReplies } from "./PostReplies";
import profilpp from "../../Assests/ProfilePic.jpg";
import { UserContext } from "../UserContext";

export const PSpace = () => {
  const { 
    username, 
    profilePic, 
    pp,
    getEffectiveUsername,
    getEffectiveProfilePic,
    currentPostOwner,
    currentPostId,
    viewingOtherPost,
    setPostOwner,
    postusid,
    setPostusid,
    postProfilepic,
    setPostProfilepic,
    postTweet,
    setPostTweet,
  } = useContext(UserContext);

  const [replyid, setReplid] = useState(0);
  const { id, name } = useParams(); // Get both post id and username from URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replies, setReplies] = useState([]);
  const [randomStart, setRandomStart] = useState(0);
  const navigate = useNavigate();

  // Get effective values for current user
  const effectiveUsername = getEffectiveUsername();
  const effectiveProfilePic = getEffectiveProfilePic();

  const profilePics = [
    "https://pbs.twimg.com/media/GiI2z1KWwAAg6OM?format=png&name=small",
    "https://pbs.twimg.com/media/GiI24aXXgAAn_8I?format=png&name=small",
    "https://pbs.twimg.com/media/GiI27GoXoAAEb-f?format=png&name=360x360",
    "https://pbs.twimg.com/media/GiI2-NCWsAEE3yK?format=png&name=small",
    "https://pbs.twimg.com/media/GiI6IbJXIAAhznQ?format=png&name=small",
    "https://pbs.twimg.com/media/GiI6N4-WIAA13yZ?format=png&name=900x900",
    "https://pbs.twimg.com/media/GiI6R1pXQAAKcjy?format=jpg&name=large",
    "https://pbs.twimg.com/media/GiI6VJdWEAApwT-?format=jpg&name=4096x4096",
    "https://pbs.twimg.com/media/GiI6edTXcAAN6Pw?format=png&name=small",
    "https://pbs.twimg.com/media/GiI6hzcXkAAvjuU?format=png&name=360x360",
    "https://pbs.twimg.com/media/GiI6nNNXAAIiyRK?format=png&name=360x360",
    "https://pbs.twimg.com/media/GiI6qFLW4AAz_-0?format=png&name=240x240",
    "https://pbs.twimg.com/media/GiI6x5PXIAAYRw_?format=png&name=360x360",
    "https://pbs.twimg.com/media/GiI60k6WUAAw1kl?format=jpg&name=large",
    "https://pbs.twimg.com/media/GiI67ylXkAAsnqy?format=png&name=900x900",
    "https://pbs.twimg.com/media/GiI7EhSWoAAYULk?format=png&name=240x240",
    "https://pbs.twimg.com/media/GiI7atYXUAAsNGJ?format=png&name=360x360",
    "https://pbs.twimg.com/media/GiI6qFLW4AAz_-0?format=png&name=240x240",
  ];

  useEffect(() => {
    setRandomStart(Math.floor(Math.random() * profilePics.length));
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://notatwitterbackend-2.onrender.com/post/${id}`);
        const fetchedPost = response.data;
        setPost(fetchedPost);
        
        // Check if we have a username in the URL (legacy route like /:name/post/:id)
        if (name && name !== 'Anonymous' && !name.startsWith('Anonymous_')) {
          // Use the username from URL as post owner
          console.log('Using username from URL:', name);
          setPostusid(name);
          setPostTweet(fetchedPost.tweet);
          
          // Try to get profile pic for this user
          try {
            const userResponse = await axios.get(`https://notatwitterbackend-2.onrender.com/check/${name}`);
            if (userResponse.data.profilePic) {
              setPostProfilepic(userResponse.data.profilePic);
              setPostOwner(id, name, userResponse.data.profilePic, `@${name}`);
            } else {
              setPostProfilepic(profilpp);
              setPostOwner(id, name, profilpp, `@${name}`);
            }
          } catch (userErr) {
            console.error("Error fetching user profile:", userErr);
            setPostProfilepic(profilpp);
            setPostOwner(id, name, profilpp, `@${name}`);
          }
        } else if (currentPostOwner && currentPostId === id) {
          // Use post owner info from context (when clicked from feed)
          setPostusid(currentPostOwner.name);
          setPostProfilepic(currentPostOwner.profilePic);
          setPostTweet(fetchedPost.tweet);
        } else {
          // Use fetched post data and update context
          setPostusid(fetchedPost.name);
          setPostProfilepic(fetchedPost.profilePic || profilpp);
          setPostTweet(fetchedPost.tweet);
          
          // Update post owner context for consistency
          setPostOwner(id, fetchedPost.name, fetchedPost.profilePic || profilpp, fetchedPost.handle);
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to fetch the post");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, name, navigate, currentPostOwner, currentPostId]); // Add name to dependencies

  useEffect(() => {
    if (post?.replies) {
      let reply = post.replies;
      
      if (typeof reply === "string") {
        reply = reply.replace(/^\s*```json\s*/, "").replace(/```\s*$/, "").trim();
        try {
          reply = JSON.parse(reply);
        } catch (error) {
          console.error("Invalid replies JSON:", error);
          return;
        }
      }

      setReplies(reply);
    }
  }, [post]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!post) return <p>No post found</p>;

  // Determine whose post we're viewing
  const postOwnerName = currentPostOwner ? currentPostOwner.name : post.name;
  const postOwnerProfilePic = currentPostOwner ? currentPostOwner.profilePic : (post.profilePic || profilpp);
  const postOwnerHandle = currentPostOwner ? currentPostOwner.handle : post.handle;

  return (
    <div>
      <div className="post-details">
        {/* Main Post - Show original post owner's info */}
        <div className="preply">
          <PostReply  
            id={post.id}
            profilePic={postOwnerProfilePic}
            name={postOwnerName}
            handle={postOwnerHandle}
            tweet={post.tweet}
          />
        </div>

        {/* Post Owner Info */}
        {/* {viewingOtherPost && (
          <div className="post-owner-info">
            <p className="viewing-post-by"> @{postOwnerName}</p>
          </div>
        )} */}

        {/* Replies */}
        <p>Replies</p>
        <ul className="replies">
          {replies.map((reply, index) => (
            <li key={index}>
              <PostReplies
                repid={replyid + index}
                postid={post.id}
                id={reply.userID}
                profilePic={profilePics[(randomStart + index) % profilePics.length]}
                name={reply.username ? reply.username.slice(1) : 'Anonymous'}
                handle={reply.username || '@Anonymous'}
                tweet={reply.reply}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
