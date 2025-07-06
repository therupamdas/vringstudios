import React from "react";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div>
      <section className="bg-green-600 text-white text-center py-20 px-4">
        <h1 className="mt-4 mb-4 text-8xl font-bold leading-tight">
          Find the Perfect Editing
        </h1>
        <h1 className="mb-4 text-8xl font-bold leading-tight">
          Services for You
        </h1>
        <p className="text-xl mb-6">Trusted by 100+ clients</p>
      </section>
      <div className="flex flex-row justify-center items-stretch gap-6 mt-10 px-4 flex-wrap">
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
