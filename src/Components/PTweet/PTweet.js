
import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Side } from '../Side/Side';
import { Trending } from '../Trending/Trending';
import { PSpace } from './PSpace';
import { MetaTags } from '../MetaTags';
import { UserContext } from '../UserContext';
import './PTweet.css';

export const PTweet = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentPostOwner, currentPostId } = useContext(UserContext);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://notatwitterbackend-2.onrender.com/post/${id}`);
        setPost(response.data);
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
    
    const title = `${postAuthor} on NotATwitter: "${postContent.substring(0, 50)}${postContent.length > 50 ? '...' : ''}"`;
    const description = postContent.length > 160 ? `${postContent.substring(0, 160)}...` : postContent;
    const image = postProfilePic || 'https://notatwitter.vercel.app/logo2.png';
    const url = `${window.location.origin}/post/${id}`;

    return {
      title,
      description,
      image,
      url,
      author: postAuthor,
      authorHandle: postAuthorHandle,
      postContent
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
    </div>
  )
}

 
