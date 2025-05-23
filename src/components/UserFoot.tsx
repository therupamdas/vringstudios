"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import { User } from "@/model/User";

export default function UserFoot() {

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 p-2 hover:bg-muted rounded-md transition">
        <Image
          src={user?.image || "/defaultuser.png"}
          alt="User Avatar"
          width={100}
          height={100}
          className="rounded-full w-7 h-7"
        />
        <div className="text-left">
          <div className="text-sm font-medium">{user?.username}</div>
          <div className="text-xs text-muted-foreground">{user?.email || "Please Login"}</div>
        </div>
        <ChevronDown className="w-4 h-4 ml-auto" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
