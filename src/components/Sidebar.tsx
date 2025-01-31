"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import './Sidebar.css';

const Sidebar = () => {
  const { data: session } = useSession();
  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        <li className="sidebar-item">Home</li>
        <li className="sidebar-item">About</li>
        <li className="sidebar-item">Services</li>
        <li className="sidebar-item">Contact</li>
        <li className="sidebar-item">Blog</li>
        <li className="sidebar-item">Portfolio</li>
        <li className="sidebar-item">Careers</li>

        {!session ? (
          <div className="user-box">
            <img
              className="user-avatar"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              alt="Default Avatar"
            />
            <b className="user-name">Please Login</b>
          </div>
        ) : (
          <div className="user-box">
            <img className="user-avatar" src={session.user.image || ""} alt="User Avatar" />
            <b className="user-name">{session.user.name || "Username"}</b>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
