"use client";
import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { User } from "@/model/User";
import './Sidebar.css';

const Sidebar = () => {
   const [user, setUser] = useState<User | null>(null);
  
    useEffect(() => {
      async function fetchUser() {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      }
      fetchUser();
    }, []);
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


          <div className="user-box">
            <Image className="user-avatar"src={user?.image || '/defaultuser.png'} priority={false} width={100}
          height={100} alt="User Avatar" />
            <b className="user-name">{user?.username || "Please Login"}</b>
          </div>
        
      </ul>
    </div>
  );
};

export default Sidebar;
