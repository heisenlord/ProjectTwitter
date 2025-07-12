import React, { useState } from 'react';

export const TwitterCardDebug = ({ postUrl }) => {
  const [showDebug, setShowDebug] = useState(false);

  if (!postUrl) return null;

  const twitterValidatorUrl = `https://cards-dev.twitter.com/validator?url=${encodeURIComponent(postUrl)}`;
  const facebookDebuggerUrl = `https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(postUrl)}`;
  const linkedinPostInspectorUrl = `https://www.linkedin.com/post-inspector/inspect/${encodeURIComponent(postUrl)}`;

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
      <button 
        onClick={() => setShowDebug(!showDebug)}
        style={{
          background: '#1da1f2',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          cursor: 'pointer',
          fontSize: '20px'
        }}
        title="Debug Twitter Cards"
      >
        🐦
      </button>
      
      {showDebug && (
        <div style={{
          position: 'absolute',
          bottom: '60px',
          right: '0',
          background: '#000',
          border: '1px solid #333',
          borderRadius: '10px',
          padding: '15px',
          minWidth: '300px',
          color: 'white',
          fontSize: '14px'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#1da1f2' }}>Social Media Debuggers</h4>
          
          <div style={{ marginBottom: '10px' }}>
            <strong>Twitter Card Validator:</strong><br/>
            <a 
              href={twitterValidatorUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#1da1f2', fontSize: '12px' }}
            >
              Test on Twitter
            </a>
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <strong>Facebook Debugger:</strong><br/>
            <a 
              href={facebookDebuggerUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#1da1f2', fontSize: '12px' }}
            >
              Test on Facebook
            </a>
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <strong>LinkedIn Post Inspector:</strong><br/>
            <a 
              href={linkedinPostInspectorUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#1da1f2', fontSize: '12px' }}
            >
              Test on LinkedIn
            </a>
          </div>
          
          <div style={{ marginTop: '15px', padding: '10px', background: '#1a1a1a', borderRadius: '5px' }}>
            <strong>Current URL:</strong><br/>
            <span style={{ fontSize: '11px', wordBreak: 'break-all' }}>{postUrl}</span>
          </div>
          
          <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
            <strong>💡 Tip:</strong> Use these tools to validate how your shared links appear on each platform!
          </div>
        </div>
      )}
    </div>
  );
};

export default TwitterCardDebug; 