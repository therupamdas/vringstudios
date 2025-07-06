/* eslint-disable */
"use client";
import React, { useCallback, useEffect, useState } from "react";
import Newprofile from "@/components/Newprofile";
import { Message } from "@/model/User";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { apiResponse } from "@/types/apiResponse";
import { User } from "next-auth";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { MessageCard } from "@/components/MessageCard";

const Page: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Start as loading
  const [isSwitchLoading, setIsSwitchLoading] = useState(true); // Start as loading
  const [profileUrl, setProfileUrl] = useState("");

  const { data: session, status } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch("acceptMessages");

  useEffect(() => {
    if (!session?.user) return;

    const fetchAll = async () => {
      setIsLoading(true);
      setIsSwitchLoading(true);
      try {
        const [messagesRes, acceptRes] = await Promise.all([
          axios.get("/api/getmessages", { withCredentials: true }),
          axios.get("/api/acceptmessages", { withCredentials: true }),
        ]);

        setMessages(messagesRes.data.messages || []);
        setValue("acceptMessages", acceptRes.data.isAcceptingMessages);

        const baseUrl = `${window.location.protocol}//${window.location.host}`;
        const username = (session.user as User).username;
        setProfileUrl(`${baseUrl}/u/${username}`);
      } catch (error) {
        const axiosError = error as AxiosError<apiResponse>;
        toast("Error", {
          description:
            axiosError.response?.data.message || "Failed to load data",
        });
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    };

    fetchAll();
  }, [session, setValue]);

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<apiResponse>(
        "/api/acceptmessages",
        {
          acceptMessages: !acceptMessages,
        },
        { withCredentials: true }
      );
      setValue("acceptMessages", !acceptMessages);
      toast(response.data.message, {});
    } catch (error) {
      const axiosError = error as AxiosError<apiResponse>;
      toast("Error", {
        description:
          axiosError.response?.data.message || "Failed to update setting",
      });
    }
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const copyToClipboard = () => {
    if (!profileUrl) return;
    navigator.clipboard.writeText(profileUrl);
    toast("URL Copied", {
      description: "Copied to clipboard",
    });
  };

  if (status === "loading" || !session?.user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="font-sans py-10 m-0 bg-white text-gray-700 flex flex-col lg:flex-row justify-center gap-6 px-4">
      {/* Sidebar Profile */}
      <Newprofile />

      {/* Main Content */}
      <main className="w-full md:w-8/12">
        {/* Switch & Copy Section */}
        <div className="bg-gray-100 p-4 rounded-md">
          <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
            <Switch
              {...register("acceptMessages")}
              checked={acceptMessages}
              onCheckedChange={handleSwitchChange}
              disabled={isSwitchLoading}
            />
            <span className="ml-0 sm:ml-2 mt-2 sm:mt-0 text-sm md:text-base">
              Accept Orders: {acceptMessages ? "On" : "Off"}
            </span>
          </div>

          <h2 className="text-lg font-semibold mb-2">
            Copy Your Account Address
          </h2>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={profileUrl}
              disabled
              className="input input-bordered h-9 w-full p-2 border rounded sm:rounded-r-none"
            />
            <Button className="h-9 sm:rounded-l-none" onClick={copyToClipboard}>
              Copy
            </Button>
          </div>
        </div>

        {/* Orders Section */}
        <h1 className="my-6 text-xl font-medium">Accepted Orders</h1>

        <div className="bg-gray-100 p-4 rounded-sm mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isLoading ? (
            <p>Loading messages...</p>
          ) : messages.length > 0 ? (
            messages.map((message, index) => (
              <MessageCard
                key={message?._id || index}
                message={message}
                onMessageDelete={handleDeleteMessage}
              />
            ))
          ) : (
            <p>No messages to display.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Page;
