import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PostReplyothers } from "../PTweet/PostReply";
import { PostReplies } from "../PTweet/PostReplies";

export const Pdummyhelp = () => {
  const { did } = useParams();
  const index = parseInt(did) - 1 || 0;

  const idList = [
    "3c8a54b8-34f4-449e-a6c6-88b700fb541e",
    "220faddb-bc76-4d14-8480-6bca71a4f2db",
    "bb9135e7-bbbe-4e2a-b35f-4b132de8bbaf",
  ];
  
  const profilePics = [
    "https://pbs.twimg.com/media/GiI2z1KWwAAg6OM?format=png&name=small",
    "https://pbs.twimg.com/media/GiI24aXXgAAn_8I?format=png&name=small",
    "https://pbs.twimg.com/media/GiI27GoXoAAEb-f?format=png&name=360x360",
  ];

  const dummypics = [
    "https://pbs.twimg.com/media/GizvRblagAAYWro?format=jpg&name=360x360",
    "https://pbs.twimg.com/media/GizvRvhawAA2AG7?format=jpg&name=small",
    "https://pbs.twimg.com/media/GizvTj1bMAACm4a?format=jpg&name=360x360",
  ];

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replies, setReplies] = useState([]);
  const [randomStart, setRandomStart] = useState(0);

  useEffect(() => {
    setRandomStart(Math.floor(Math.random() * profilePics.length));
  }, []);

  useEffect(() => {
    if (index < 0 || index >= idList.length) {
      setError("Invalid Post ID");
      setLoading(false);
      return;
    }
  
    const fetchPost = async () => {
      try {
        console.log(`Fetching: ${dummypics[index]}`);
        const { data } = await axios.get(`https://notatwitterbackend-2.onrender.com/post/${idList[index]}`);
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPost();
  }, [index]);
  

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

  const tweetjson = {
    users: [
      { username: "BOBjr", handle: "@not_hillbilly_boi" },
      { username: "DHTFI", handle: "@alwaysNotOnSpeak" },
      { username: "Neeru....🚬", handle: "@notChokkaku" },
    ],
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>No post found</p>;

  return (
    <div className=" pdummyhelp">
      <PostReplyothers
        id={tweetjson.users[index].username}
        profilePic={dummypics[index % dummypics.length]}
        name={tweetjson.users[index].username}
        handle={tweetjson.users[index].handle}
        tweet={post.tweet}
      />
      <p>Replies</p>
      <ul className="replies">
        {replies.map((reply, idx) => (
          <PostReplies
            key={idx}
            repid={idx}
            postid={post.id}
            id={reply.userID}
            profilePic={profilePics[(randomStart + idx) % profilePics.length]}
            name={reply.username.slice(1)}
            handle={reply.username}
            tweet={reply.reply}
            disabled={true}
          />
        ))}
      </ul>
    </div>
  );
};
