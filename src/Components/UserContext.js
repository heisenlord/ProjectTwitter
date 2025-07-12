import React, { createContext, useState, useEffect } from 'react';

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
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [anonymousSessionId, setAnonymousSessionId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPassword, setUserPassword] = useState('');
  
  // Post owner context - for viewing other people's posts
  const [currentPostOwner, setCurrentPostOwner] = useState(null);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [viewingOtherPost, setViewingOtherPost] = useState(false);

  // Anonymous user defaults - using a better anonymous profile picture
  const anonymousProfilePic = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
  const anonymousUsername = 'Anonymous';

  // Initialize user session on component mount
  useEffect(() => {
    const initializeSession = () => {
      // Check for saved user login
      const savedUser = localStorage.getItem('loggedInUser');
      const savedProfilePic = localStorage.getItem('userProfilePic');
      const savedPassword = localStorage.getItem('userPassword');

      if (savedUser && savedProfilePic) {
        setUsername(savedUser);
        setProfilePic(savedProfilePic);
        setPp(savedProfilePic);
        setUserPassword(savedPassword || '');
        setIsLoggedIn(true);
        setIsAnonymous(false);
        console.log('User session restored:', savedUser);
      } else {
        // Set up anonymous session
        const savedAnonymousId = localStorage.getItem('anonymousSessionId');
        if (savedAnonymousId) {
          setAnonymousSessionId(savedAnonymousId);
        } else {
          // Generate a unique anonymous session ID
          const newAnonymousId = `Anonymous_${Date.now()}`;
          setAnonymousSessionId(newAnonymousId);
          localStorage.setItem('anonymousSessionId', newAnonymousId);
        }
        setIsAnonymous(true);
        setIsLoggedIn(false);
      }
    };

    initializeSession();
  }, []);

  // Login function
  const login = (user, password, profilePicture) => {
    setUsername(user);
    setProfilePic(profilePicture);
    setPp(profilePicture);
    setUserPassword(password);
    setIsLoggedIn(true);
    setIsAnonymous(false);
    
    // Save to localStorage
    localStorage.setItem('loggedInUser', user);
    localStorage.setItem('userProfilePic', profilePicture);
    localStorage.setItem('userPassword', password);
    
    // Remove anonymous session when user logs in
    localStorage.removeItem('anonymousSessionId');
    
    console.log('User logged in:', user);
  };

  // Logout function
  const logout = () => {
    setUsername('');
    setProfilePic('');
    setPp('');
    setUserPassword('');
    setIsLoggedIn(false);
    setIsAnonymous(true);
    
    // Clear localStorage
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('userProfilePic');
    localStorage.removeItem('userPassword');
    
    // Set up new anonymous session
    const newAnonymousId = `Anonymous_${Date.now()}`;
    setAnonymousSessionId(newAnonymousId);
    localStorage.setItem('anonymousSessionId', newAnonymousId);
    
    console.log('User logged out');
  };

  // Function to set post owner when viewing other people's posts
  const setPostOwner = (postId, ownerName, ownerProfilePic, ownerHandle) => {
    setCurrentPostId(postId);
    setCurrentPostOwner({
      name: ownerName,
      profilePic: ownerProfilePic,
      handle: ownerHandle
    });
    setViewingOtherPost(true);
    console.log('Viewing post by:', ownerName);
  };

  // Function to clear post owner context
  const clearPostOwner = () => {
    setCurrentPostOwner(null);
    setCurrentPostId(null);
    setViewingOtherPost(false);
  };

  // Helper function to get effective username
  const getEffectiveUsername = () => {
    if (isLoggedIn && username) {
      return username;
    }
    // Return persistent anonymous username for session
    return anonymousSessionId || anonymousUsername;
  };

  // Helper function to get effective profile pic
  const getEffectiveProfilePic = () => {
    if (isLoggedIn && (profilePic || pp)) {
      return profilePic || pp;
    }
    return anonymousProfilePic;
  };

  // Helper function to check if user is anonymous
  const isUserAnonymous = () => {
    return !isLoggedIn || !username || username === '';
  };

  // Helper function to check if user needs to login
  const requiresLogin = () => {
    return !isLoggedIn;
  };

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
      postReply, setPostReply,
      isAnonymous, setIsAnonymous,
      anonymousSessionId, setAnonymousSessionId,
      isLoggedIn, setIsLoggedIn,
      userPassword, setUserPassword,
      currentPostOwner, setCurrentPostOwner,
      currentPostId, setCurrentPostId,
      viewingOtherPost, setViewingOtherPost,
      login, logout,
      setPostOwner, clearPostOwner,
      getEffectiveUsername,
      getEffectiveProfilePic,
      isUserAnonymous,
      requiresLogin,
      anonymousProfilePic,
      anonymousUsername
    }}>
      {children}
    </UserContext.Provider>
  );
};
