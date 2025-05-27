"use client";
import React, { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import "./SignInCard.css";
const SignInCard: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const { data: session } = useSession();

  return ( 
    <div className="container">
      <div className="cardleft"></div>
      <div className="card">
        <div className="tab-switch-container">
          <div className={`tab-background ${isSignUp ? "left" : "right"}`}></div>
          <button
            className={`tab-btn ${isSignUp ? "active" : ""}`}
            onClick={() => setIsSignUp(true)}
          >
            Sign Up
          </button>
          <button
            className={`tab-btn ${!isSignUp ? "active" : ""}`}
            onClick={() => setIsSignUp(false)}
          >
            Log In
          </button>
        </div>
        <p className="card-description">Choose a method to sign in below:</p>
        <div className="button-group">
          {isSignUp ? <SignUpForm /> : <SignInForm />}

          <div className="border-t border-gray-400 my-1" />
          {!session && (
            <button
              onClick={() => signIn("google")}
              className="button google"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google Icon"
                className="icon"
              />
              Sign in with Google
            </button>
          )}
          {!session && (
            <button
              onClick={() => signIn("github")}
              className="button github"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.178c-3.338.726-4.042-1.61-4.042-1.61-.546-1.389-1.333-1.759-1.333-1.759-1.091-.746.082-.731.082-.731 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.805 1.305 3.492.997.108-.775.419-1.305.762-1.604-2.665-.302-5.466-1.333-5.466-5.932 0-1.31.468-2.38 1.235-3.221-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.984-.399 3.006-.404 1.02.005 2.05.138 3.008.404 2.292-1.553 3.298-1.23 3.298-1.23.653 1.653.241 2.873.119 3.176.77.841 1.233 1.911 1.233 3.221 0 4.61-2.804 5.626-5.476 5.921.43.372.814 1.105.814 2.227v3.306c0 .319.192.694.801.576C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              Sign in with GitHub
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignInCard;
