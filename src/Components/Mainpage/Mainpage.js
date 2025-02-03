import React from 'react';
import { Side } from '../Side/Side';
import { Trending } from '../Trending/Trending';
import { Space } from '../Space/Space';
import './mainpage.css'; // Import the CSS file

export const Mainpage = () => {
  return (
    <div className="main-container">
      <div className="content-wrapper">
        <Side className="sides" />
        <Space />
        <Trending className="trending" />
      </div>
    </div>
  );
};
