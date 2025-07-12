import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { Side } from '../Side/Side';
import { Trending } from '../Trending/Trending';
import './profile.css';

export const ProfileWelcome = () => {
  const { 
    getEffectiveUsername, 
    getEffectiveProfilePic,
    isLoggedIn,
    isUserAnonymous,
    logout
  } = useContext(UserContext);

  const effectiveUsername = getEffectiveUsername();
  const effectiveProfilePic = getEffectiveProfilePic();

  const handleLogout = () => {
    logout();
    window.location.href = '/'; // Redirect to home after logout
  };

  return (
    <div>
      <div className="main-container">
        <div className="content-wrapper">
          <Side className="sides" />
          <div className='space profileedsspace'>
            <div className='profilespace'>
              <img className='profilepic' src={effectiveProfilePic} alt="Profile"/>
              <div className='divul'>
                <ul className='proful'>
                  <li className='profuid'>
                    <p>{isLoggedIn ? effectiveUsername : 'Anonymous User'}</p>
                  </li>
                  <li className='profid'>
                    <h4>@{effectiveUsername}</h4>
                  </li>
                </ul>
                <div className="Bio">
                  <h3 className='Bioh1'>
                    Hello hi {effectiveUsername}! We are pleased to be in this platform. 
                    Everything here is made for fun! 🎉
                  </h3>
                </div>
              </div>
            </div>
            
            <div className='welcome-actions'>
              <Link to="/home" className='welcome-btn'>
                Go to Home Feed
              </Link>
              {!isLoggedIn ? (
                <Link to="/login" className='welcome-btn'>
                  Login / Sign Up
                </Link>
              ) : (
                <button onClick={handleLogout} className='welcome-btn logout-btn'>
                  Logout
                </button>
              )}
            </div>
          </div>
          <Trending className="trending" />
        </div>
      </div>
    </div>
  );
}; 