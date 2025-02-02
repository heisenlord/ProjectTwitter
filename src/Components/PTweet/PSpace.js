import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { PostReply } from "./PostReply";
import { PostReplies } from "./PostReplies";
import profilpp from "../../Assests/ProfilePic.jpg";
import { UserContext } from "../UserContext";

export const PSpace = () => {
  const { username, profilePic, pp } = useContext(UserContext);
  const {
    
    postusid,
    setPostusid,
    postProfilepic,
    setPostProfilepic,
    postTweet,
    setPostTweet,
  } = useContext(UserContext);

  const [replyid, setReplid] = useState(0);
  const { name, id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replies, setReplies] = useState([]);
  const [randomStart, setRandomStart] = useState(0);
  const navigate = useNavigate();

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
    // Generate a random starting index between 0 and profilePics.length - 1
    setRandomStart(Math.floor(Math.random() * profilePics.length));
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/post/${id}`);
        setPost(response.data);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to fetch the post");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  useEffect(() => {
    if (post) {
      setPostusid(post.name);
      setPostProfilepic(post.profilePic || profilpp);
      setPostTweet(post.tweet);
    }
    console.log(post);
  }, [post]);

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

  return (
    <div>
      <div className="post-details">
        {/* Main Post */}
        <PostReply
          id={post.id}
          profilePic={profilePic || pp || profilpp} // Handle undefined profile pic
          name={post.name}
          handle={post.handle}
          tweet={post.tweet}
        />

        {/* Replies */}
        <p>Replies</p>
        <ul className="replies">
          {replies.map((reply, index) => (
            <li key={index}>
              <PostReplies
                repid={replyid + index}
                postid={post.id}
                id={reply.userID}
                profilePic={profilePics[(randomStart + index) % profilePics.length]} // Ensure cycling properly
                name={reply.username.slice(1)}
                handle={reply.username}
                tweet={reply.reply}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
