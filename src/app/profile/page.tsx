"use client"
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import "./profilepage.css";
import ProfileCard from "@/components/ProfileCard";
import Newprofile from "@/components/Newprofile";
import { Message } from "@/model/User";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { apiResponse } from "@/types/apiResponse";
import { User } from "next-auth";

const Page: React.FC = () => {
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [profileUrl, setProfileUrl] = useState("");

  const { toast } = useToast();
  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { watch, setValue } = form;
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
    return <div>Please log in first.</div>;
  }

  return (
    <>
      <div className="profilepage">
        <div className="leftsection">
          {/* <ProfileCard /> */}
          <Newprofile/>
        </div>

        <div className="rightsection">
          <main className="containerprofile">
            <h1>Your Buying Orders</h1>
            <div className="orders">
              <div className="order">
                <h2>Order #1</h2>
                <p>Details about this order go here.</p>
                <a href="#" className="btn">
                  View Order
                </a>
              </div>
              <div className="order">
                <h2>Order #2</h2>
                <p>Details about this order go here.</p>
                <a href="#" className="btn">
                  View Order
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>

      <footer>
        <p>&copy; 2024 Fiverr. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Page;
