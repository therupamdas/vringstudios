import React from "react";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";


export default function Home() {
  return (
    <div>
      <section className="hero">
        <h1 className="hero-title">Find the Perfect Editing</h1>
        <h1 className="hero-title">Services for You.</h1>
        <p className="hero-subtitle">Trusted by clients.</p>
        <div className="hero-search">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="hero-input typing"
          />
          <button className="hero-button">Search</button>
        </div>
      </section>
      {/* Extended Homepage Sections */}
      <div className="flex flex-row justify-center items-stretch gap-6 mt-10 px-4 flex-wrap">
        {/* What's New Card */}
        <Card className="w-full max-w-md shadow-md">
          <CardHeader>
            <CardTitle>✨ What's New</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-2">
              Check out the latest updates and features we've added this week!
            </p>
            <Button>View Updates</Button>
          </CardContent>
        </Card>

        {/* Invite Friends */}
        <Card className="w-full max-w-md shadow-md">
          <CardHeader>
            <CardTitle>🎉 Invite Friends</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-2">
              Share the magic of VringStudios with your friends and earn
              rewards.
            </p>
            <Button variant="secondary">Generate Invite Link</Button>
          </CardContent>
        </Card>

        {/* Get in Touch */}
        <Card className="w-full max-w-md shadow-md">
          <CardHeader>
            <CardTitle>📬 Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Input placeholder="Your email" />
            <Input placeholder="Your message" />
            <Button>Send Message</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
