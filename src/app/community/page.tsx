"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Sidebar from "@/components/Sidebar";
import "./CommunityPage.css";
import { User } from "@/model/User";

const postSchema = z.object({
  message: z.string().min(5),
});

type PostData = z.infer<typeof postSchema>;

interface Message {
  _id: string;
  username: string;
  message: string;
  date: string;
  image: string;
}

const Page: React.FC = () => {
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

  const [messages, setMessages] = useState<Message[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostData>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = async (data: PostData) => {
    const res = await fetch("/api/community", {
      method: "POST",
      body: JSON.stringify({
        username: user?.username || "Guest",
        image: "/Groupie.jpg",
        // image: user?.image || "/Groupie.jpg",
        message: data.message,
        date: new Date().toISOString(),
      }),
    });
    if (res.ok) {
      reset();
      fetchMessages();
    }
  };

  const fetchMessages = async () => {
    const res = await fetch("/api/community");
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="community-container">
      <Sidebar />
      <div className="post-section">
        <form className="postform" onSubmit={handleSubmit(onSubmit)}>
          <div className="postform-header">Post a Request</div>
          <textarea
            placeholder="How can we help you?"
            className="postform-input"
            {...register("message")}
          />
          {errors.message && (
            <p className="error-text">Message must be at least 5 characters.</p>
          )}
          <button className="postform-button" type="submit">
            Submit
          </button>
        </form>

        {messages.map((msg) => (
          <div key={msg._id} className="post-card">
            <div className="user-info">
              <img className="user-image" src={msg.image} alt="User" />
              <div className="flex flex-col">
                <p className="username">{msg.username}</p>
                <p className="timestamp">
                  {new Date(msg.date).toLocaleString(undefined, {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </p>
              </div>
            </div>
            <div className="user-request">
              <p>{msg.message}</p>
            </div>
            <div className="action-buttons">
              <button className="btn accept-btn">Accept</button>
              <button className="btn decline-btn">Bargain</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
