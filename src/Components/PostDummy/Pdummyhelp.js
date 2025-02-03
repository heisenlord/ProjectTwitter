import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostReplyothers } from "../PTweet/PostReply";
import { PostReplies } from "../PTweet/PostReplies";

export const Pdummyhelp = () => {
  const { did } = useParams();
  const index = parseInt(did) - 1 || 0; // Convert `did` to a number, default to 0 if invalid

  const idList = [
    "24f5c4e8-1585-40dd-98da-ac9d23b964f5",
    "681d81f8-19f7-4a84-acd7-854098891a8d",
    "53a6c981-b1a3-4749-a777-9fbaaf2d3622",
  ];
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
      // Generate a random starting index between 0 and profilePics.length - 1
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
        const response = await fetch(`https://notatwitterbackend-1.onrender.com/post/${did}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await response.json();
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
      {
        username: "BOBjr",
        handle: "@not_hillbilly_boi",
    
      },
      {
        username: "DHTFI",
        handle: "@alwaysNotOnSpeak",
  
      },
      {
        username: "Neeru....🚬",
        handle: "@notChokkaku",
        
      }
    ]
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>No post found</p>;

  return (
    <div >
      <PostReplyothers
        id={tweetjson.users[index].username}
        profilePic={dummypics[index % dummypics.length]} // Cycle through profile pics
        name={tweetjson.users[index].username}
        handle={tweetjson.users[index].handle}
        tweet={post.tweet}
      />
       <p>Replies</p>
              <ul className="replies">
              {replies.map((reply, index) => (
  <PostReplies
    repid={index}
    postid={post.id}
    id={reply.userID}
    profilePic={profilePics[(randomStart + index) % profilePics.length]} // Ensure cycling properly
    name={reply.username.slice(1)}
    handle={reply.username}
    tweet={reply.reply}
    disabled={true} // **Disable the component immediately**
  />
))}

              </ul>

    </div>
  );
}; 