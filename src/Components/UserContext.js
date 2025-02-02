import React, { createContext, useState } from 'react';

// Create UserContext
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [pp, setPp] = useState('');  
  const [postusid, setPostusid] = useState('');
  const [postProfilepic, setPostProfilepic] = useState('');
  const [postTweet, setPostTweet] = useState('');
  const [postreplyid, setPostreplyid] = useState('');
  const [postReplyPic, setPostReplyPic] = useState('');
  const [postReply, setPostReply] = useState('');

  return (
    <UserContext.Provider value={{ 
      username, setUsername, 
      profilePic, setProfilePic, 
      pp, setPp, 
      postusid, setPostusid, 
      postProfilepic, setPostProfilepic, 
      postTweet, setPostTweet, 
      postreplyid, setPostreplyid, 
      postReplyPic, setPostReplyPic, 
      postReply, setPostReply 
    }}>
      {children}
    </UserContext.Provider>
  );
};
