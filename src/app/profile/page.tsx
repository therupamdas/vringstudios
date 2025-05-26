"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
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
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { MessageCard } from "@/components/MessageCard";

const Page: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [profileUrl, setProfileUrl] = useState("");

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
      <div className="profilepage">
        <div className="leftsection">
          <Newprofile />
        </div>

        <div className="rightsection">
          <main className="containerprofile">
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
            <h2 className="text-lg font-semibold mb-2">
              Copy Your Account Address
            </h2>
            <div className="flex items-center">
              <input
                type="text"
                value={profileUrl}
                disabled
                className="input input-bordered w-full p-2 mr-2 border rounded border-#0"
              />
              <Button onClick={copyToClipboard}>Copy</Button>
            </div>
            <Separator className="my-6" />
            <h1>Accepted Orders</h1>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              {messages.length > 0 ? (
                messages.map((message, index) => (
                  <MessageCard
                    key={message?.id}
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
      </div>
    </>
  );
};

export default Page;
