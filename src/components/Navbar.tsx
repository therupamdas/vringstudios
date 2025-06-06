"use client";
import React, { useState, useEffect } from "react";

import SignInCard from "./SignInCard";
import { useSession, signOut } from "next-auth/react";
import { User } from "@/model/User";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent,  DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
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

  const { data: session } = useSession();
  const router = useRouter();
  const handleClick = () => {
    router.push("/profile");
  };

   return (
    <nav
      className="
     bg-white sticky top-0 p-0
     flex justify-between items-center border-b border-gray-200 
      transition-all ease-linear duration-[100ms] cursor-pointer"
    >
      <div className="pl-5 text-2xl font-bold text-green-600">VringStudios</div>
      <div className="flex transition-all duration-1000 ease-in-out mr-2">
        <a
          href="/"
          className="text-gray-600 no-underline p-4 cursor-pointer hover:text-green-600"
        >
          Home
        </a>
        <a
          href="about"
          className="text-gray-600 no-underline p-4 cursor-pointer hover:text-green-600"
        >
          About
        </a>
        <a
          href="community"
          className="text-gray-600 no-underline p-4 cursor-pointer hover:text-green-600"
        >
          Community
        </a>
        {!session && (
          <Dialog>
            <DialogTitle></DialogTitle>
            {/* <DialogTrigger className="text-gray-600 no-underline p-4 cursor-pointer hover:text-green-600"> */}
            <DialogTrigger>
              <Avatar className="border-2 hover:border-2 hover:border-green-600 transition-all duration-100">
                <AvatarImage
                  className="w-full h-full rounded-full object-cover cursor-pointer "
                  src="/log.jpg"
                />
                <AvatarFallback className="text-xs text-gray-600"></AvatarFallback>
              </Avatar>
            </DialogTrigger>
            <DialogContent className="w-96 rounded-sm">
              <SignInCard />
            </DialogContent>
          </Dialog>
        )}
        {session && (
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Avatar className="border-2 hover:border-2 hover:border-green-600 transition-all duration-100">
                <AvatarImage
                  className="w-full h-full rounded-full object-cover cursor-pointer "
                  src={user?.image || "/log.jpg"}
                />
                <AvatarFallback> </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleClick}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
