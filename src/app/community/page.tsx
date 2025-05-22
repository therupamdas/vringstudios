import React from 'react';
import './CommunityPage.css';
import Sidebar from '@/components/Sidebar';

const Page: React.FC = () => {
  return (
      <div className="community-container">
        <Sidebar />
        <div className="post-section">
          <div className="postform">
            <div className="postform-header">
              Post a Request
            </div>
            <textarea
              placeholder="How can we help you?"
              className="postform-input">
            </textarea>
            <button className="postform-button">
              Submit
            </button>
          </div>

          <div className="post-card">
            <div className="user-info">
              <img className="user-image" src="/Groupie.jpg" alt="User" />
              <p className="username">username</p>
            </div>
            <div className="user-request">
              <p>Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description</p>
            </div>
            <div className="action-buttons">
              <button className="btn accept-btn">Accept</button>
              <button className="btn decline-btn">Bargain</button>
            </div>
          </div>
        </div>
      </div>

  );
};

export default Page;
