"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import SignInCard from "./SignInCard";
import { useSession, signIn, signOut } from "next-auth/react";
import { User } from "@/model/User";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

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
    <nav className="navbar">
      <div className="navbar-brand">VringStudios</div>
      <div className="nav-links">
        <a href="/" className="nav-link">
          Home
        </a>
        <a href="about" className="nav-link">
          About
        </a>
        <a href="community" className="nav-link fttf">
          Community
        </a>
        {!session && (
          <Dialog>
            <DialogTrigger id="litgreen" className=" register ">
              Register
            </DialogTrigger>
            <DialogContent className="w-2 ">
              <SignInCard />
            </DialogContent>
          </Dialog>
        )}
        {session && (
          <div className="profilemenu">
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <Image
                  src={user?.image || "/defaultuser.png"}
                  alt="User Avatar"
                  width={100}
                  height={100}
                  className="profilelogo"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator /> */}
                <DropdownMenuItem  onClick={handleClick}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
