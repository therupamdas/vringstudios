import React from "react";
import "./globals.css";

export default function Home() {
  return (
    <div>
      <section className="hero">
        <h1 className="hero-title">
          Find the Perfect Editing
        </h1>
        <h1 className="hero-title">
          Services for You.
        </h1>
        <p className="hero-subtitle">
          Trusted by clients.
        </p>
        <div className="hero-search">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="hero-input typing"
          />
          <button className="hero-button">Search</button>
        </div>
      </section>
    </div>
  );
}
