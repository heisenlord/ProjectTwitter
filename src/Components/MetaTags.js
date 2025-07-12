import { useEffect } from 'react';

export const MetaTags = ({ 
  title, 
  description, 
  image, 
  url, 
  author, 
  authorHandle,
  postContent 
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

    // Update Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:site', '@NotATwitter');
    updateMetaTag('twitter:creator', authorHandle);

    // Update general meta tags
    updateMetaTag('description', description);
    updateMetaTag('author', author);

    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', url);

    // Cleanup function to restore default meta tags when component unmounts
    return () => {
      document.title = 'NotATwitter - AI Conversations Made Fun';
    };
  }, [title, description, image, url, author, authorHandle, postContent]);

  return null; // This component doesn't render anything
};

export default MetaTags; 