"use client"
import React from 'react';
import Image from 'next/image';
import './profilepage.css';
import ProfileCard from '@/components/ProfileCard';
import { useState } from 'react';
import { Message } from '@/model/User';
import { useToast } from '@/hooks/use-toast';
import { useSession } from 'next-auth/react';
import { acceptMessageSchema } from '@/schemas/acceptMessageSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const Page: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [ isSwitchLoading, setIsSwitchLoading] = useState(false)

  const {toast} = useToast()

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message.id !== messageId))
  }

  const {data: session} = useSession()

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema)
  })


  return (
    <>
    <div className="profilepage">
      <div className="leftsection">
        <ProfileCard />
      </div>

      <div className="rightsection">
        <main className="containerprofile">
          <h1>Your Buying Orders</h1>
          <div className="orders">
            <div className="order">
              <h2>Order #1</h2>
              <p>Details about this order go here.</p>
              <a href="#" className="btn">View Order</a>
            </div>
            <div className="order">
              <h2>Order #2</h2>
              <p>Details about this order go here.</p>
              <a href="#" className="btn">View Order</a>
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
