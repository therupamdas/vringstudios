"use client";
import React, { useCallback, useEffect, useState } from "react";
import "./profilepage.css";
import Newprofile from "@/components/Newprofile";
import { Message } from "@/model/User";
import { useToast } from "@/components/ui/use-toast";
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
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [profileUrl, setProfileUrl] = useState("");
  console.log(isLoading)
  const { toast } = useToast();

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get("/api/acceptmessages", {
        withCredentials: true,
      });
      setValue("acceptMessages", response.data.isAcceptingMessages);
    } catch (error) {
      const axiosError = error as AxiosError<apiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message || "Failed to fetch settings",
        variant: "destructive",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(async (refresh = false) => {
    setIsLoading(true);

    try {
      const response = await axios.get("/api/getmessages", {
        withCredentials: true,
      });
      setMessages(response.data.messages || []);
      console.log("Fetched messages:", response.data.messages);
      if (refresh) {
        toast({
          title: "Refreshed messages",
          description: "Showing Latest Messages",
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<apiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message || "Failed to fetch messages",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!session?.user) return;

    fetchMessages();
    fetchAcceptMessages();

    const baseUrl = `${window.location.protocol}//${window.location.host}`;
    const username = (session.user as User).username;
    setProfileUrl(`${baseUrl}/u/${username}`);
  }, [session, fetchMessages, fetchAcceptMessages]);

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
      toast({
        title: response.data.message,
        variant: "default",
      });
    } catch (error) {
      const axiosError = error as AxiosError<apiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message || "Failed to update setting",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    if (!profileUrl) return;
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: "URL Copied",
      description: "Copied to clipboard",
    });
  };

  if (!session || !session.user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="font-sans m-0 p-0 bg-white text-gray-700 flex flex-row justify-evenly">
        <div className="flex justify-center mr-[5px]">
          <Newprofile />
        </div>

        <main className=" w-6/12 py-10">
          <div className="bg-gray-50 border-1 border-gray-200 p-3 rounded-sm">
            <div className="mb-4">
              <Switch
                {...register("acceptMessages")}
                checked={acceptMessages}
                onCheckedChange={handleSwitchChange}
                disabled={isSwitchLoading}
              />
              <span className="ml-2">
                Accept Orders: {acceptMessages ? "On" : "Off"}
              </span>
            </div>
            <h2 className="ml-0.5 text-lg font-semibold mb-2">
              Copy Your Account Address
            </h2>
            <div className="flex items-center">
              <input
                type="text"
                value={profileUrl}
                disabled
                className="input input-bordered h-9 w-full p-2 border rounded rounded-r-none "
              />
              <Button className="h-9 rounded-l-none" onClick={copyToClipboard}>
                Copy
              </Button>
            </div>
          </div>
          <h1 className="my-6">Accepted Orders</h1>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <MessageCard
                  key={message?.date || index}
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
    </>
  );
};

export default Page;
