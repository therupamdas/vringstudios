"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import SignInCard from './SignInCard';
import { useSession, signIn, signOut } from "next-auth/react"

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const openModal = () => setIsModalOpen(true); // Opens the modal
  const closeModal = () => setIsModalOpen(false); // Closes the modal
  // Close the modal when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);
  const { data: session } = useSession();
  

  return (
    <nav className="navbar">
      <div className="navbar-brand">VringStudios</div>
      <div className={`modal-overlay  ${isModalOpen ? 'wel1' : 'wel2'}`}>
        <div ref={modalRef} className="modal-content">
          <SignInCard />
        </div>
      </div>
      <div className="nav-links">
        <a href="/" className="nav-link">Home</a>
        <a href="services" className="nav-link">Services</a>
        <a href="about" className="nav-link">About</a>
        <a href="community" className="nav-link">Community</a>
        {!session && (
          <div onClick={openModal} className="nav-link">Register</div>
        )
        }
        {session && (
          <div className="profilemenu">
            <Image src='/groupie.jpg' alt="User Avatar" width={40} height={40} className="profilelogo" />
            <ul className="dropdown">
              <li><a href="/profile">Profile</a></li>
              <li><a href="/buying">Buying</a></li>
              <li><a href="/selling">Selling</a></li>
              <li><div onClick={() => signOut()} >Logout</div></li>
            </ul>
          </div>
        )}

      </div>
    </nav>
  )
}

export default Navbar;
