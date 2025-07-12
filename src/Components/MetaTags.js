import { useEffect } from 'react';

export const MetaTags = ({ 
  title, 
  description, 
  image, 
  url, 
  author, 
  authorHandle,
  postContent,
  replyCount,
  topReplies
}) => {
  useEffect(() => {
    // Update page title
    document.title = title || 'NotATwitter - AI Conversations Made Fun';

    // Update or create meta tags
    const updateMetaTag = (property, content) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`) || 
                   document.querySelector(`meta[name="${property}"]`);
      
      if (!metaTag) {
        metaTag = document.createElement('meta');
        if (property.startsWith('og:') || property.startsWith('twitter:')) {
          metaTag.setAttribute('property', property);
        } else {
          metaTag.setAttribute('name', property);
        }
        document.head.appendChild(metaTag);
      }
      
      metaTag.setAttribute('content', content);
    };

    // Update Open Graph tags
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', image);
    updateMetaTag('og:url', url);
    updateMetaTag('og:type', 'article');
    updateMetaTag('og:site_name', 'NotATwitter');
    updateMetaTag('og:article:author', author);
    updateMetaTag('og:article:published_time', new Date().toISOString());
    
    // Add reply count to Open Graph
    if (replyCount > 0) {
      updateMetaTag('og:article:section', `${replyCount} replies`);
    }

    // Enhanced Twitter Card tags for maximum compatibility
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:site', '@NotATwitter');
    updateMetaTag('twitter:creator', authorHandle);
    
    // Twitter-optimized title (max 70 characters)
    const twitterTitle = title.length > 70 ? title.substring(0, 67) + '...' : title;
    updateMetaTag('twitter:title', twitterTitle);
    
    // Twitter-optimized description (max 200 characters for better display)
    const twitterDescription = description.length > 200 ? description.substring(0, 197) + '...' : description;
    updateMetaTag('twitter:description', twitterDescription);
    
    // Image with proper sizing for Twitter
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:image:alt', `Post by ${author} on NotATwitter`);
    
    // Additional Twitter metadata for rich previews
    updateMetaTag('twitter:label1', 'Replies');
    updateMetaTag('twitter:data1', replyCount ? replyCount.toString() : '0');
    updateMetaTag('twitter:label2', 'Author');
    updateMetaTag('twitter:data2', author);
    
    // Twitter domain verification
    updateMetaTag('twitter:domain', 'notatwitter.vercel.app');
    updateMetaTag('twitter:url', url);

    // Update general meta tags
    updateMetaTag('description', twitterDescription); // Use Twitter-optimized description
    updateMetaTag('author', author);
    
    // Additional meta tags for better Twitter compatibility
    updateMetaTag('application-name', 'NotATwitter');
    updateMetaTag('theme-color', '#1da1f2');
    
    // Ensure proper charset and viewport for Twitter previews
    let charsetMeta = document.querySelector('meta[charset]');
    if (!charsetMeta) {
      charsetMeta = document.createElement('meta');
      charsetMeta.setAttribute('charset', 'utf-8');
      document.head.insertBefore(charsetMeta, document.head.firstChild);
    }
    
    // Twitter-specific app meta tags
    updateMetaTag('twitter:app:name:iphone', 'NotATwitter');
    updateMetaTag('twitter:app:name:googleplay', 'NotATwitter');
    updateMetaTag('twitter:app:url:iphone', url);
    updateMetaTag('twitter:app:url:googleplay', url);

    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', url);

    // Add structured data (JSON-LD)
    let structuredData = document.querySelector('script[type="application/ld+json"]');
    if (structuredData) {
      structuredData.remove();
    }
    
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "SocialMediaPosting",
      "headline": title,
      "description": description,
      "image": image,
      "url": url,
      "author": {
        "@type": "Person",
        "name": author,
        "alternateName": authorHandle
      },
      "publisher": {
        "@type": "Organization",
        "name": "NotATwitter",
        "url": "https://notatwitter.vercel.app"
      },
      "datePublished": new Date().toISOString(),
      "articleBody": postContent,
      "interactionStatistic": {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/ReplyAction",
        "userInteractionCount": replyCount || 0
      }
    };

    // Add comments (replies) to structured data
    if (topReplies && topReplies.length > 0) {
      jsonLd.comment = topReplies.map(reply => ({
        "@type": "Comment",
        "text": reply.reply,
        "author": {
          "@type": "Person",
          "name": reply.username ? reply.username.slice(1) : 'Anonymous'
        }
      }));
    }

    structuredData = document.createElement('script');
    structuredData.setAttribute('type', 'application/ld+json');
    structuredData.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(structuredData);

    // Cleanup function to restore default meta tags when component unmounts
    return () => {
      document.title = 'NotATwitter - AI Conversations Made Fun';
      
      // Remove structured data on cleanup
      const structuredDataCleanup = document.querySelector('script[type="application/ld+json"]');
      if (structuredDataCleanup) {
        structuredDataCleanup.remove();
      }
    };
      }, [title, description, image, url, author, authorHandle, postContent, replyCount, topReplies]);

  return null; // This component doesn't render anything
};

export default MetaTags; 