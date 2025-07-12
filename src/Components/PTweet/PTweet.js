
import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Side } from '../Side/Side';
import { Trending } from '../Trending/Trending';
import { PSpace } from './PSpace';
import { MetaTags } from '../MetaTags';
import { TwitterCardDebug } from '../TwitterCardDebug';
import { UserContext } from '../UserContext';
import './PTweet.css';

export const PTweet = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentPostOwner, currentPostId } = useContext(UserContext);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://notatwitterbackend-2.onrender.com/post/${id}`);
        const fetchedPost = response.data;
        setPost(fetchedPost);
        
        // Parse replies if they exist
        if (fetchedPost.replies) {
          let parsedReplies = fetchedPost.replies;
          
          if (typeof parsedReplies === "string") {
            parsedReplies = parsedReplies.replace(/^\s*```json\s*/, "").replace(/```\s*$/, "").trim();
            try {
              parsedReplies = JSON.parse(parsedReplies);
            } catch (error) {
              console.error("Invalid replies JSON:", error);
              parsedReplies = [];
            }
          }
          
          setReplies(parsedReplies || []);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Determine post metadata
  const getPostMetadata = () => {
    if (!post) return {};

    const postAuthor = currentPostOwner ? currentPostOwner.name : post.name;
    const postAuthorHandle = currentPostOwner ? currentPostOwner.handle : post.handle;
    const postProfilePic = currentPostOwner ? currentPostOwner.profilePic : post.profilePic;
    const postContent = post.tweet;
    
    // Create rich title with post preview
    const title = `${postAuthor} on NotATwitter: "${postContent.substring(0, 60)}${postContent.length > 60 ? '...' : ''}"`;
    
    // Create Twitter-optimized description
    let description = `"${postContent}"`;
    
    // Add reply information for Twitter
    if (replies && replies.length > 0) {
      description += `\n\n💬 ${replies.length} ${replies.length === 1 ? 'reply' : 'replies'}`;
      
      // Add top replies for Twitter preview (shortened for character limits)
      if (replies.length > 0) {
        const topReplies = replies.slice(0, 2); // Fewer replies for Twitter
        description += '\n\nTop replies:';
        topReplies.forEach((reply) => {
          const replyUsername = reply.username ? reply.username.slice(1) : 'Anonymous';
          const replyText = reply.reply.substring(0, 50); // Shorter for Twitter
          description += `\n• @${replyUsername}: ${replyText}${reply.reply.length > 50 ? '...' : ''}`;
        });
        
        if (replies.length > 2) {
          description += `\n+ ${replies.length - 2} more replies`;
        }
      }
    }
    
    description += `\n\n🎯 Join the conversation on NotATwitter!`;
    
    const image = postProfilePic || 'https://notatwitter.vercel.app/logo2.png';
    const url = `${window.location.origin}/post/${id}`;

    return {
      title,
      description,
      image,
      url,
      author: postAuthor,
      authorHandle: postAuthorHandle,
      postContent,
      replyCount: replies.length,
      topReplies: replies.slice(0, 3)
    };
  };

  const metadata = getPostMetadata();

  return (
    <div>
      {!loading && post && (
        <MetaTags
          title={metadata.title}
          description={metadata.description}
          image={metadata.image}
          url={metadata.url}
          author={metadata.author}
          authorHandle={metadata.authorHandle}
          postContent={metadata.postContent}
          replyCount={metadata.replyCount}
          topReplies={metadata.topReplies}
        />
      )}
      <div className="main-container">
        <div className="content-wrapper">
          <Side className="sides" />
          <div className='space spaceh'>
            <PSpace />
          </div>
          <Trending className="trending" />
        </div>
      </div>
      
      {/* Twitter Card Debug Tool - Only show in development or for testing */}
      {!loading && post && (
        <TwitterCardDebug postUrl={metadata.url} />
      )}
    </div>
  )
}

 
