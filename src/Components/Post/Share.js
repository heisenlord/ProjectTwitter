import React, { useState } from 'react';

export const Share = ({ postId, postContent, postAuthor, postAuthorHandle }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const postUrl = `${window.location.origin}/post/${postId}`;
  const shareTitle = `Check out this post by ${postAuthor}`;
  const shareDescription = postContent.length > 100 ? `${postContent.substring(0, 100)}...` : postContent;

  const handleShare = async () => {
    // Check if Web Share API is supported
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareDescription,
          url: postUrl,
        });
      } catch (error) {
        console.log('Share cancelled or failed', error);
      }
    } else {
      // Fallback to show share menu
      setShowShareMenu(!showShareMenu);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowShareMenu(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard', error);
    }
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(postUrl)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
    window.open(facebookUrl, '_blank');
  };

  const shareOnWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareTitle} ${postUrl}`)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="share-container">
      <div className="share-button" onClick={handleShare}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
        </svg>
      </div>
      
      {showShareMenu && (
        <div className="share-menu">
          <div className="share-menu-item" onClick={copyToClipboard}>
            {copied ? 'Copied!' : 'Copy Link'}
          </div>
          <div className="share-menu-item" onClick={shareOnTwitter}>
            Share on Twitter
          </div>
          <div className="share-menu-item" onClick={shareOnFacebook}>
            Share on Facebook
          </div>
          <div className="share-menu-item" onClick={shareOnWhatsApp}>
            Share on WhatsApp
          </div>
        </div>
      )}
    </div>
  );
}; 