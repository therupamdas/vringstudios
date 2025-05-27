"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
  username: string;
  content: string;
  date: string;
  image: string;
  budget: string;
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
        content: data.message,
        date: new Date().toISOString(),
        budget: "4000",
      }),
    });
    if (res.ok) {
      reset();
      fetchMessages();
    }
  };

  const sendOrder = async (msg: Message) => {
    const res = await fetch("/api/takeorders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: msg.username,
        content: msg.content,
        date: msg.date,
        image: msg.image,
        budget: "4000", // You could later make this dynamic if needed
      }),
    });

    let data;
    try {
      data = await res.json();
    } catch (err) {
      throw new Error("Invalid server response");
    }

    if (!res.ok) {
      throw new Error(data?.error || "Something went wrong");
    }

    console.log("Success:", data);
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
              placeholder="Write Your Order"
              className="postform-input mb-2"
              {...register("message")}
            />
            <textarea placeholder="Amount" className="amount-input mb-2" />
            {errors.message && (
              <p className="error-text mb-2 text-red-500 ">
                Message must be at least 10 Words
              </p>
            )}
            <button className="postform-button" type="submit">
              Submit
            </button>
          </form>

          {messages.map((msg) => (
            <div key={msg.date} className="post-card">
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
                <p>{msg.content}</p>
                <div className="action-buttons">
                  <button
                    className="btn accept-btn"
                    onClick={() => sendOrder(msg)}
                  >
                    Accept
                  </button>
                  <div className="flex flex-row">
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
