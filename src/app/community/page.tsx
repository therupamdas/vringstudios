/* eslint-disable */
"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { useProfile } from "@/context/AuthProvider";

const postSchema = z.object({
  message: z.string().min(10),
  budget: z.string().min(0),
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
  const { user } = useProfile();
  // const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostData>({ resolver: zodResolver(postSchema) });

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
    // Optimistically mark as taken
    setMessages((prev) =>
      prev.map((m) => (m.date === msg.date ? { ...m, istaken: true } : m))
    );

    try {
      const ress = await fetch("/api/takeorders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(msg),
      });

      const acceptedRes = await fetch("/api/acceptedorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: msg.date }),
      });

      const data = await ress.json();
      if (!ress.ok) throw new Error(data?.error || "Something went wrong");

      reset();
      fetchMessages();
    } catch (error) {
      // Rollback on error
      setMessages((prev) =>
        prev.map((m) => (m.date === msg.date ? { ...m, istaken: false } : m))
      );
      console.error(error);
      alert(error instanceof Error ? error.message : "Unknown error");
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="p-5 flex flex-col gap-5 w-full">
        <form
          className="flex justify-center flex-col m-0 bg-gray-50 rounded-sm border-gray-200 border-1 p-2 shadow-lg w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="text-xl mb-2 text-gray-700 text-center w-full">
            Post a Request
          </div>

          <textarea
            placeholder="Write Your Order"
            className="h-48 pl-4 pt-4 border-0 bg-white rounded-sm text-gray-900 text-sm  outline-none resize-none transition-all duration-300 ease-in-out mb-2 w-full  focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-1"
            {...register("message")}
          />

          <Input
            placeholder="Amount"
            className="rounded-sm  border-0 bg-white mb-2"
            {...register("budget")}
          />

          {errors.message && (
            <p className="error-text mb-2 text-red-500">
              Message must be at least 10 Words
            </p>
          )}

          <button
            className="w-full py-2 font-bold text-white bg-green-600 border-0 rounded-md cursor-pointer transition-all duration-400 ease-in-out hover:bg-green-500 hover:-translate-x-0.5"
            type="submit"
          >
            Submit
          </button>
        </form>

        {messages.map((msg) => (
          <div
            key={msg.date}
            className={`rounded-sm p-3 flex justify-between items-center shadow-md transition-transform duration-400 ease-in-out hover:-translate-x-1.5 
              ${msg.istaken ? "bg-yellow-200" : "bg-green-200"}`}
          >
            <div className="flex gap-2 h-full">
              <Avatar>
                <AvatarImage
                  className="w-full h-full rounded-full object-cover"
                  src={msg.image}
                />
                <AvatarFallback></AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="font-bold text-xl text-gray-500">
                  {msg.username}
                </p>
                <p className="text-xs">
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

            <div className="flex-1 ml-5 text-gray-600 text-md">
              <p>{msg.content}</p>
              {!msg.istaken ? (
                <div className="mt-3 flex gap-2.5">
                  <button className="w-28 border border-gray-300 px-4 py-2 rounded-sm text-gray-800 font-bold cursor-auto transition-all duration-300 ease-in-out bg-white">
                    {msg.budget}/-
                  </button>
                  <button
                    className="w-28 border-0 px-4 py-2 rounded-sm text-white font-bold cursor-pointer transition-all duration-300 ease-in-out bg-green-600 hover:bg-green-700"
                    onClick={() => sendOrder(msg)}
                  >
                    Accept
                  </button>

                  <div className="flex flex-row gap-0 items-center">
                    <button className="w-28 border-0 px-4 py-2 rounded-sm text-white font-bold cursor-pointer transition-all duration-300 ease-in-out h-10 rounded-tr-none rounded-br-none rounded-tl-sm rounded-bl-sm bg-red-600 hover:bg-red-700">
                      Negotiate
                    </button>
                    <Input
                      className="w-36 text-center rounded-tr-sm rounded-br-sm rounded-tl-none rounded-bl-none h-10 text-base"
                      placeholder="Amount"
                    />
                  </div>
                </div>
              ) : (
                <div className="mt-3 flex gap-2.5">
                  <button className="border-0 px-4 py-2 rounded-sm text-white font-bold cursor-pointer transition-all duration-300 ease-in-out bg-yellow-300 w-full">
                    Taken
                  </button>
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
