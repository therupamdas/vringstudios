"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User } from "@/model/User";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";

import "./CommunityPage.css";
import OrderModel from "@/model/Order";

const postSchema = z.object({
  message: z.string().min(10),
  budget:  z.string().min(0),
});

type PostData = z.infer<typeof postSchema>;

interface Message {
  username: string;
  content: string;
  date: string;
  image: string;
  budget: string;
  istaken: boolean;
}

const Page: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostData>({ resolver: zodResolver(postSchema) });

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

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const res = await fetch("/api/community");
    if (res.ok) {
      const data = await res.json();
      setMessages(data);
    }
  };

  const onSubmit = async (data: PostData) => {
    const res = await fetch("/api/community", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user?.username || "Guest",
        image: user?.image || "/defaultuser.png",
        content: data.message,
        date: new Date().toISOString(),
        budget: data.budget,
        istaken: false,
      }),
    });

    if (res.ok) {
      reset();
      fetchMessages();
    }
  };
  const router = useRouter();
  const sendOrder = async (msg: Message) => {
    const ress = await fetch("/api/takeorders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(msg),
    });

    const response = await fetch("/api/acceptedorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: msg.date }),
    });
    reset();
    fetchMessages();

    try {
      const data = await ress.json();
      if (!ress.ok) throw new Error(data?.error || "Something went wrong");
      console.log("Success:", data);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Unknown error");
    }

  };

  return (
    <SidebarProvider>
      <AppSidebar />

      {/* <div className="community-container"> */}
        <div className="post-section w-full">
          <form className="postform  w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="postform-header  w-full">Post a Request</div>

            <textarea
              placeholder="Write Your Order"
              className="postform-input mb-2 w-full  focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-1"
              {...register("message")}
            />

            <Input
              
              placeholder="Amount"
              className="amount-input mb-2"
              {...register("budget")}
            />

            {errors.message && (
              <p className="error-text mb-2 text-red-500">
                Message must be at least 10 Words
              </p>
            )}

            <button className="postform-button" type="submit">
              Submit
            </button>
          </form>

          {messages.map((msg) => (
            <div key={msg.date} className={!msg.istaken? "post-card-white":"post-card-yellow"}>
              <div className="user-info">
                <Image
                  className="user-image"
                  src={msg.image}
                  height={100}
                  width={100}
                  alt="User"
                />
                <div className="flex flex-col">
                  <p className="username">{msg.username}</p>
                  <p className="timestamp font-arial">
                    {new Date(msg.date)
                      .toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })
                      .replace(",", "")}
                  </p>
                </div>
              </div>

              <div className="user-request">
                <p>{msg.content}</p>
                {!msg.istaken ? (
                  <div className="action-buttons">
                    <button
                      className="budget"
                    >
                      {msg.budget}/-
                    </button>
                    <button
                      className="btn accept-btn"
                      onClick={() => sendOrder(msg)}
                    >
                      Accept
                    </button>

                    <div className="flex flex-row gap-0 items-center">
                      <button className="btn h-10 decline-btn">Negotiate</button>
                      <Input
                        className="negmount h-10 text-base"
                        placeholder="Amount"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="action-buttons">
                    <button className="btn bg-yellow-500 w-full">Taken</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      {/* </div> */}
    </SidebarProvider>
  );
};

export default Page;
