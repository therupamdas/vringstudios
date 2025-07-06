"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import React from "react";
import SignInCard from "./SignInCard";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useProfile } from "@/context/AuthProvider";

const Navbar = () => {
  const { user } = useProfile();
  const { data: session } = useSession();
  const router = useRouter();
  const handleClick = () => {
    router.push("/profile");
  };

  return (
    <nav
      className="
     bg-white sticky top-0 p-0 z-50
     flex justify-between items-center border-b border-gray-200 
      transition-all ease-linear duration-100 cursor-pointer"
    >
      <Link
            href="/" className="pl-5 text-2xl font-bold text-green-600">VringStudios</Link>
      <div className="flex transition-all duration-1000 ease-in-out mr-2">
        <Button className="my-2 mx-1" asChild variant="ghost">
          <Link
            href="/"
            className="text-gray-600 no-underline cursor-pointer hover:text-green-600"
          >
            Home
          </Link>
        </Button>

        <Button className="my-2 mx-1" asChild variant="ghost">
          <Link
            href="about"
            className="text-gray-600 no-underline cursor-pointer hover:text-green-600"
          >
            About
          </Link>
        </Button>

        <Button className="my-2 mx-1" asChild variant="ghost">
          <Link
            href="community"
            className="text-gray-600 no-underline cursor-pointer hover:text-green-600"
          >
            Community
          </Link>
        </Button>

        
        {!session && (
          <Dialog>
            <DialogTitle></DialogTitle>
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
