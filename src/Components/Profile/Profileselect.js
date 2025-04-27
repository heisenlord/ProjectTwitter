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

  // Use UserContext to get username, setUsername, profilePic, setProfilePic
  const {
    username = "test",
    setUsername,
    profilePic,
    setProfilePic,
  } = useContext(UserContext);

  const [password, setPassword] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isUsernameEntered, setIsUsernameEntered] = useState(false);
  const [loading, setLoading] = useState(false); // <-- loading state added

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      setLoading(true); // Start loading
      const inputUsername = username.trim();
      const inputPassword = password.trim();
      console.log(profilePic);

      if (inputUsername.length > 0 && inputPassword.length > 0) {
        try {
          const response = await axios.get(
            `https://notatwitterbackend-2.onrender.com/check/${inputUsername}`
          );

          if (response.data.success) {
            if (response.data.password === inputPassword) {
              setUsernameMessage("Login successful! Redirecting...");
              setTimeout(() => navigate(`/${username}`), 1000);
            } else {
              setPasswordMessage(
                "Incorrect password or userid already exist try with new user id. Try again."
              );
            }
          } else {
            await axios.post(
              "https://notatwitterbackend-2.onrender.com/check/saveuser/u",
              {
                username: inputUsername,
                password: inputPassword,
                profilePic: profilePic || profilePicarr[0],
              }
            );

            setUsernameMessage("Welcome to NotATwitter!");
            setIsUsernameEntered(true);
            setTimeout(() => navigate(`/${username}`), 1000);
          }
        } catch (error) {
          setUsernameMessage("Error checking or saving username");
        }
      } else {
        setUsernameMessage("Username must not be empty");
        setPasswordMessage("Password must be at least 6 characters");
      }
      setLoading(false); // Stop loading after everything
    }
  };

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
            where conversations get real, but people don’t!
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
          <p>{username}</p>
        </label>

        {!isUsernameEntered && !loading && (
          <>
            <input
              id="usernameinp"
              type="text"
              className="useridinput spacetext stextarea w-50 bg-transparent text-xl placeholder-twitter-gray outline-none resize-none textarea-font"
              placeholder="What's your username?"
              value={username}
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
