import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { PostReply } from "./PostReply";
import { PostReplies } from "./PostReplies";
import profilpp from '../../Assests/ProfilePic.jpg';

export const PSpace = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replies, setReplies] = useState([]);
  const [randomStart, setRandomStart] = useState(0); // Track random starting index
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
    // Generate a random starting index between 0 and 17 when the component mounts
    const randomIndex = Math.floor(Math.random() * 17); // Range: 0–17
    setRandomStart(randomIndex);
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
    if (post?.replies) {
      let reply = post.replies || "";
      reply = reply
        .replace(/^\s*```json\s*/, "")
        .replace(/```\s*$/, "")
        .trim();

      if (reply) {
        try {
          const reps = JSON.parse(reply);
          setReplies(reps);
        } catch (error) {
          console.error("Invalid replies JSON:", error);
        }
      }
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
          profilePic={profilpp} // Use the random starting index for the main post
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
                id={reply.userID}
                profilePic={
                  profilePics[(randomStart + index) % 18]
                } // Cycle through the profilePics array starting from randomStart
                name={reply.username}
                handle={reply.userID}
                tweet={reply.reply}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
