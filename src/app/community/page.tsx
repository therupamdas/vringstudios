"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Sidebar from "@/components/Sidebar";
import "./CommunityPage.css";
import { User } from "@/model/User";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import { Input } from "@/components/ui/input";

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
        image: user?.image || "/defaultuser.png",
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
    <SidebarProvider>
      <AppSidebar />

      <div className="community-container">
        {/* <Sidebar /> */}

        <div className="post-section">
          <form className="postform" onSubmit={handleSubmit(onSubmit)}>
            {/* <SidebarTrigger /> */}
            <div className="postform-header">Post a Request</div>
            <textarea
              placeholder="How can we help you?"
              className="postform-input mb-1"
              {...register("message")}
            />
            {errors.message && (
              <p className="error-text mb-1 text-red-500 ">
                Message must be at least 10 Words
              </p>
            )}
            <button className="postform-button" type="submit">
              Submit
            </button>
          </form>

          {messages.map((msg) => (
            <div key={msg._id} className="post-card">
              <div className="user-info">
                <Image
                  className="user-image"
                  src={msg.image}
                  height="100"
                  width="100"
                  alt="User"
                />
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
                <div className="action-buttons">
                  <button className="btn accept-btn">Accept</button>
                  <div className=" flex flex-row">
                    <button className="btn flex flex-row gap-2 items-center decline-btn">
                      Negotiate
                    </button>
                    <Input
                      className="negmount h-10 text-base w-25"
                      placeholder="Amount"
                    />
                  </div>
                </div>
                <div className="action-buttons">
                  <button className="btn bg-yellow-400">Taken</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Page;
