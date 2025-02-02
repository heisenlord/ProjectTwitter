import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { PostReply } from '../PTweet/PostReply';
import { PostReplies } from '../PTweet/PostReplies';
import { UserContext } from '../UserContext';
import { useParams } from 'react-router-dom';
import './preply.css';

const sendReply = async (id, repid, postusid, postProfilepic, postTweet, postreplyid, postReplyPic, replyText, setReplies) => {
  try {
    const response = await axios.post('http://localhost:3000/generatereply', {
      pid: `${id}${repid}`,
      prompt: postTweet,
      name: [postusid, postreplyid],
      profilePic: [postProfilepic, postReplyPic],
      postReply: replyText,
    });

    setReplies(response.data.replies);  // Update replies state with the latest data
    console.log("from front end", response.data.replies);
    return response.data;
  } catch (error) {
    console.error('Error sending reply:', error.response?.data || error.message);
    throw error;  // Re-throw error to handle in the parent
  }
};

export const PReplyhelp = () => {
  const { id, repid } = useParams();
  const { postusid, postProfilepic, postTweet, postreplyid, postReplyPic, postReply } = useContext(UserContext);
  const [replyText, setReplyText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [replies, setReplies] = useState([]);
  const [loadingReplies, setLoadingReplies] = useState(false);

  // Fetch replies for this post when the component mounts or when postusid changes
  useEffect(() => {
    const fetchReplies = async () => {
      setLoadingReplies(true);
      try {
        console.log(`Requesting URL: http://localhost:3000/generatereply/getreplies/${id}${repid}`);
        const response = await axios.get(`http://localhost:3000/generatereply/getreplies/${id}${repid}`);

        setReplies(response.data.replies);  // Set replies when fetched
      } catch (error) {
        console.error('Error fetching replies:', error);
      } finally {
        setLoadingReplies(false);
      }
    };

    // Only fetch replies if the id and repid are valid
    if (id && repid) {
      fetchReplies();
    }
  }, [id, repid]); // Re-fetch replies when the component is mounted or the params change

  const handleTextareaChange = (e) => {
    setReplyText(e.target.value);
  };

  const handleReplySubmit = async () => {
    if (!replyText.trim()) return;

    setIsLoading(true);
    try {
      // Send the reply and update the replies state
      await sendReply(id, repid, postusid, postProfilepic, postTweet, postreplyid, postReplyPic, replyText, setReplies);
      setReplyText('');
    } catch (error) {
      console.error("Failed to post reply");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='space'>
      <PostReply id={postusid} profilePic={postProfilepic} name={postusid} handle={postusid} tweet={postTweet} />
      <p>REPLY CHAT</p>
      <ul className='replies'>
        <li>
          <PostReplies
            repid={postreplyid}
            postid={postusid}
            id={postreplyid}
            profilePic={postReplyPic}
            name={postreplyid}
            handle={postreplyid}
            tweet={postReply}
            disabled={true}
          />
        </li>
        {loadingReplies ? (
          <p>Loading replies...</p>  // Show a loading message if replies are still being fetched
        ) : replies.length > 0 ? (
          replies.map((reply, index) => (
            <li key={index}>
              <PostReplies
                repid={reply.userID}
                postid={postusid}
                id={reply.userID}
                profilePic={reply.profilePic}  // Explicitly use the user's profilePic
                name={reply.userID}
                handle={reply.userID}
                tweet={reply.reply}
                disabled={false}
              />
            </li>
          ))
        ) : (
          <p>No replies yet</p>
        )}
        <li className='replyingli'>
          <h1 className='replying'>
            Replying to <span className='repblue'>@{postreplyid}</span>
          </h1>
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
