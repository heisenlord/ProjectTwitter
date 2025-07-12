import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext"; // Correct import for UserContext

// Array of profile picture URLs
export const Profileselect = () => {
  const navigate = useNavigate();
  const profilePicarr = [
    "https://pbs.twimg.com/media/GipjMwUbYAMy1DQ?format=jpg&name=small",
    "https://pbs.twimg.com/media/GipjTj4bYAE_KSm?format=jpg&name=medium",
    "https://pbs.twimg.com/media/GipjMwSbYAUAyPz?format=jpg&name=900x900",
    "https://pbs.twimg.com/media/GipjMwSbYAMuY2h?format=jpg&name=small",
    "https://pbs.twimg.com/media/GipjMwRaYAAsutz?format=jpg&name=small",
  ];

  // Use UserContext for login functionality
  const {
    username,
    setUsername,
    profilePic,
    setProfilePic,
    login,
    isLoggedIn,
    getEffectiveUsername,
    getEffectiveProfilePic
  } = useContext(UserContext);

  const [password, setPassword] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isUsernameEntered, setIsUsernameEntered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localUsername, setLocalUsername] = useState('');

  const handleUsernameChange = (e) => setLocalUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      setLoading(true);
      const inputUsername = localUsername.trim();
      const inputPassword = password.trim();
      const selectedProfilePic = profilePic || profilePicarr[0];

      if (inputUsername.length > 0 && inputPassword.length > 0) {
        try {
          const response = await axios.get(
            `https://notatwitterbackend-2.onrender.com/check/${inputUsername}`
          );

          if (response.data.success) {
            // User exists, check password
            if (response.data.password === inputPassword) {
              // Login successful
              const userProfilePic = response.data.profilePic || selectedProfilePic;
              login(inputUsername, inputPassword, userProfilePic);
              
              setUsernameMessage("Login successful! Redirecting...");
              setTimeout(() => {
                navigate(`/home`); // Redirect to home instead of user-specific URL
              }, 1000);
            } else {
              setPasswordMessage("Incorrect password. Try again.");
            }
          } else {
            // User doesn't exist, create new account
            await axios.post(
              "https://notatwitterbackend-2.onrender.com/check/saveuser/u",
              {
                username: inputUsername,
                password: inputPassword,
                profilePic: selectedProfilePic,
              }
            );

            // Login the new user
            login(inputUsername, inputPassword, selectedProfilePic);
            
            setUsernameMessage("Welcome to NotATwitter! Account created successfully!");
            setIsUsernameEntered(true);
            setTimeout(() => {
              navigate(`/home`); // Redirect to home
            }, 1000);
          }
        } catch (error) {
          console.error('Login error:', error);
          setUsernameMessage("Error during login. Please try again.");
        }
      } else {
        setUsernameMessage("Username must not be empty");
        setPasswordMessage("Password must not be empty");
      }
      setLoading(false);
    }
  };

  // If user is already logged in, redirect to home
  if (isLoggedIn) {
    navigate('/home');
    return null;
  }

  return (
    <div className="space spaceundefined">
      <div className="pswelcom">
        <p>
          Hey there! Welcome to{" "}
          <strong>
            Not<span className="Aspan">A</span>Twitter
          </strong>
          <br />{" "}
          <span className="spanreal">
            where conversations get real, but people don't!
          </span>
        </p>
        <p className="spanreal">login or signup to continue</p>
      </div>

      <div className="inputuser">
        {loading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        )}

        <div className="profilePicPreviewContainer">
          <img
            src={profilePic || profilePicarr[0]}
            alt="Profile Preview"
            className="profilePicPreview"
          />
        </div>

        <label htmlFor="userid">
          <p>Username: {localUsername}</p>
        </label>

        {!isUsernameEntered && !loading && (
          <>
            <input
              id="usernameinp"
              type="text"
              className="useridinput spacetext stextarea w-50 bg-transparent text-xl placeholder-twitter-gray outline-none resize-none textarea-font"
              placeholder="What's your username?"
              value={localUsername}
              onChange={handleUsernameChange}
            />

            <input
              type="password"
              className="useridinput spacetext stextarea w-50 bg-transparent text-xl placeholder-twitter-gray outline-none resize-none textarea-font"
              placeholder="What's your password?"
              value={password}
              onChange={handlePasswordChange}
              onKeyDown={handleKeyPress}
            />
            <h2>Press return/enter to submit</h2>
          </>
        )}

        {usernameMessage && <h1>{usernameMessage}</h1>}
        {passwordMessage && <h1 className="password">{passwordMessage}</h1>}

        {!loading && (
          <>
            <h1>Select your beta user profile</h1>
            <div className="inputdivimg">
              {profilePicarr.map((pic, index) => (
                <img
                  key={index}
                  className="imgppps"
                  src={pic}
                  alt={`Profile ${index + 1}`}
                  onClick={() => setProfilePic(pic)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
