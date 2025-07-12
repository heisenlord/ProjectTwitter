import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../UserContext';
import './side.css';
import axios from "axios";

import profilepic1 from "../Profile/profilepics/profilepic1.jpeg"

export const Side = () => {
  const { name } = useParams(); // Keep for legacy support
  const { 
    username, 
    profilePic, 
    pp, 
    setPp, 
    getEffectiveUsername, 
    getEffectiveProfilePic,
    isLoggedIn,
    isUserAnonymous,
    logout
  } = useContext(UserContext);
  
  const [finalProfilePic, setFinalProfilePic] = useState(profilePic || profilepic1);

  // Get effective values for navigation
  const effectiveUsername = getEffectiveUsername();
  const effectiveProfilePic = getEffectiveProfilePic();

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        // Only fetch if we have a real username from URL (legacy support)
        if (name && name !== 'Anonymous' && !name.startsWith('Anonymous_')) {
          const response = await axios.get(`https://notatwitterbackend-2.onrender.com/check/${name}`);
          if (response.data.profilePic) {
            setFinalProfilePic(response.data.profilePic);
            setPp(response.data.profilePic);
          }
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error);
        setFinalProfilePic(profilepic1);
      }
    };

    // Only fetch if user is not logged in and we have a name from URL
    if (!isLoggedIn && name) {
      fetchProfilePic();
    }
  }, [name, isLoggedIn]);

  // Use effective values for navigation
  const navProfilePic = isLoggedIn ? effectiveProfilePic : (finalProfilePic || effectiveProfilePic);

  const handleLogout = () => {
    logout();
    window.location.href = '/'; // Redirect to home after logout
  };

  return (
    <div className='Side'>
      <ul className='sideul'>
        {/* Home Link */}
        <li className='NotHome sideli'>
          <Link to="/home" className='btn'>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 32 32">
              <path d="M 13 4 L 13 6 L 9 6 L 9 8 L 5 8 L 5 10 L 2 10 L 2 11 L 2 12 L 2 13 L 4 13 L 4 28 L 28 28 L 28 13 L 30 13 L 30 12 L 30 11 L 30 10 L 27 10 L 27 9 L 27 8 L 27 4 L 25 4 L 25 8 L 23 8 L 23 6 L 19 6 L 19 4 L 13 4 z M 14 7 L 18 7 L 18 8 L 18 9 L 22 9 L 22 10 L 22 11 L 26 11 L 26 12 L 26 13 L 26 26 L 22 26 L 22 14 L 10 14 L 10 26 L 6 26 L 6 13 L 6 12 L 6 11 L 10 11 L 10 10 L 10 9 L 14 9 L 14 8 L 14 7 z M 12 16 L 20 16 L 20 20 L 18 20 L 18 22 L 20 22 L 20 26 L 12 26 L 12 16 z"></path>
            </svg>
          </Link>
        </li>

        {/* Search Link */}
        <li className='NotSearch sideli'>
          <Link to="/search" className='btn'>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 32 32">
              <path d="M 11 2 L 11 4 L 21 4 L 21 2 L 11 2 z M 21 4 L 21 6 L 23 6 L 23 4 L 21 4 z M 23 6 L 23 16 L 25 16 L 25 6 L 23 6 z M 23 16 L 21 16 L 21 18 L 23 18 L 23 16 z M 21 18 L 11 18 L 11 20 L 15 20 L 15 23 L 14 23 L 14 30 L 18 30 L 18 23 L 17 23 L 17 20 L 21 20 L 21 18 z M 11 18 L 11 16 L 9 16 L 9 18 L 11 18 z M 9 16 L 9 6 L 7 6 L 7 16 L 9 16 z M 9 6 L 11 6 L 11 4 L 9 4 L 9 6 z"></path>
            </svg>
          </Link>
        </li>

        {/* Notifications Link */}
        <li className='NotNotifications sideli'>
          <Link to="/notifications" className='btn'>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 32 32">
              <path d="M 15 2 L 15 5 L 8 5 L 8 6 C 8 17.711111 3.0136719 23.982422 3.0136719 23.982422 L 3.0351562 24 L 3 24 L 3 26 L 22 26 L 22 24 L 5.3945312 24 C 6.3603087 22.418959 7.952243 19.23188 9 14.6875 L 9 15 L 20 15 L 20 13 L 9.2773438 13 C 9.3884813 12.393761 9.3988261 11.648349 9.484375 11 L 20 11 L 20 9 L 9.6894531 9 C 9.7444838 8.3102614 9.8769076 7.7304147 9.8964844 7 L 22.097656 7 C 22.393589 18.610421 27.185547 25.582031 27.185547 25.582031 L 28.814453 24.417969 C 28.814453 24.417969 24 17.722222 24 6 L 24 5 L 17 5 L 17 2 L 15 2 z M 15.041016 27.304688 C 14.423995 29.401649 13.222656 30.898436 13.222656 30.898436 L 14.777344 32.15625 C 14.777344 32.15625 16.216005 30.394179 16.958984 27.869141 L 15.041016 27.304688 z"></path>
            </svg>
          </Link>
        </li>

        {/* Bookmarks Link */}
        <li className='NotBookmark sideli'>
          <Link to="/bookmarks" className='btn'>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 32 32">
              <path d="M25 3A1 1 0 1025 5 1 1 0 1025 3zM22 3A1 1 0 1022 5 1 1 0 1022 3zM19 3A1 1 0 1019 5 1 1 0 1019 3zM16 3A1 1 0 1016 5 1 1 0 1016 3zM13 3A1 1 0 1013 5 1 1 0 1013 3zM10 3A1 1 0 1010 5 1 1 0 1010 3zM7 3A1 1 0 107 5 1 1 0 107 3zM25 6A1 1 0 1025 8 1 1 0 1025 6zM22 6A1 1 0 1022 8 1 1 0 1022 6zM19 6A1 1 0 1019 8 1 1 0 1019 6zM16 6A1 1 0 1016 8 1 1 0 1016 6zM13 6A1 1 0 1013 8 1 1 0 1013 6zM10 6A1 1 0 1010 8 1 1 0 1010 6zM7 6A1 1 0 107 8 1 1 0 107 6zM25 9A1 1 0 1025 11 1 1 0 1025 9zM22 9A1 1 0 1022 11 1 1 0 1022 9zM19 9A1 1 0 1019 11 1 1 0 1019 9zM16 9A1 1 0 1016 11 1 1 0 1016 9zM13 9A1 1 0 1013 11 1 1 0 1013 9zM10 9A1 1 0 1010 11 1 1 0 1010 9zM7 9A1 1 0 107 11 1 1 0 107 9zM25 12A1 1 0 1025 14 1 1 0 1025 12zM22 12A1 1 0 1022 14 1 1 0 1022 12zM19 12A1 1 0 1019 14 1 1 0 1019 12zM16 12A1 1 0 1016 14 1 1 0 1016 12zM13 12A1 1 0 1013 14 1 1 0 1013 12zM10 12A1 1 0 1010 14 1 1 0 1010 12zM7 12A1 1 0 107 14 1 1 0 107 12zM25 15A1 1 0 1025 17 1 1 0 1025 15zM22 15A1 1 0 1022 17 1 1 0 1022 15zM19 15A1 1 0 1019 17 1 1 0 1019 15zM16 15A1 1 0 1016 17 1 1 0 1016 15zM13 15A1 1 0 1013 17 1 1 0 1013 15zM10 15A1 1 0 1010 17 1 1 0 1010 15zM7 15A1 1 0 107 17 1 1 0 107 15zM25 18A1 1 0 1025 20 1 1 0 1025 18zM22 18A1 1 0 1022 20 1 1 0 1022 18zM19 18A1 1 0 1019 20 1 1 0 1019 18zM16 18A1 1 0 1016 20 1 1 0 1016 18zM13 18A1 1 0 1013 20 1 1 0 1013 18zM10 18A1 1 0 1010 20 1 1 0 1010 18zM7 18A1 1 0 107 20 1 1 0 107 18zM25 21A1 1 0 1025 23 1 1 0 1025 21zM22 21A1 1 0 1022 23 1 1 0 1022 21zM19 21A1 1 0 1019 23 1 1 0 1019 21zM16 21A1 1 0 1016 23 1 1 0 1016 21zM13 21A1 1 0 1013 23 1 1 0 1013 21zM10 21A1 1 0 1010 23 1 1 0 1010 21zM7 21A1 1 0 107 23 1 1 0 107 21zM25 24A1 1 0 1025 26 1 1 0 1025 24zM22 24A1 1 0 1022 26 1 1 0 1022 24zM19 24A1 1 0 1019 26 1 1 0 1019 24zM13 24A1 1 0 1013 26 1 1 0 1013 24zM10 24A1 1 0 1010 26 1 1 0 1010 24zM7 24A1 1 0 107 26 1 1 0 107 24zM25 27A1 1 0 1025 29 1 1 0 1025 27zM22 27A1 1 0 1022 29 1 1 0 1022 27zM10 27A1 1 0 1010 29 1 1 0 1010 27zM7 27A1 1 0 107 29 1 1 0 107 27zM7 30A1 1 0 107 32 1 1 0 107 30zM25 30A1 1 0 1025 32 1 1 0 1025 30z"></path>
            </svg>
          </Link>
        </li>

        {/* Profile Pic Link */}
        <li className="profilepics lipp">
       
            <Link to="/profile" className="btn">
              <img className="sideimgpp ppp sidepp" src={navProfilePic} alt="Profile"/>
            </Link>
          
        </li>

        {/* User Status - Alternative placement */}
        {/* <li className="user-status">
          {isLoggedIn ? (
            <div className="logged-in-user">
              <p className="username-display">@{username}</p>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="anonymous-user">
              <p className="anonymous-display">Anonymous User</p>
              <Link to="/profile" className="login-link">
                Login
              </Link>
            </div>
          )}
        </li> */}
      </ul>
    </div>
  );
};
