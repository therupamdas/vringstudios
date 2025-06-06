"use client";


import { useEffect, useState } from "react";
import { User } from "@/model/User";
import { EditProfile } from "./Editprofile";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
const Newprofile: React.FC = () => {
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

  const dateuser = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
      })
    : "N/A";
  
  return (
    <div className="mt-2 w-80 h-full p-2 border border-transparent rounded-sm bg-white text-left">
      <Avatar className="w-80 h-80 mb-5 border-2 border-gray-300 rounded-full">
        <AvatarImage
          className="w-80 h-80 rounded-full object-cover"
          src={user?.image || "/defaultuser.png"}
        />
        <AvatarFallback></AvatarFallback>
      </Avatar>

      <h2 className="text-4xl font-bold m-0">
        {user?.username || "anonymous"}
      </h2>
      <p className="text-gray-500 text-xl m-0 mb-3">{user?.email || "anonymous"}</p>
      <p className="mt-[15px] text-gray-800 text-sm">{user?.bio || "#Bio Goes Here...."}</p>
      <hr className="my-3 border-t border-gray-200 border-0" />
      <EditProfile />
      <ul className="text-sm text-gray-800 space-y-3 mt-4">
        {[
  ["fas fa-building", user?.college || "College"],
  [
    "fas fa-map-marker-alt",
    user?.city && user?.state
      ? `${user.city}, ${user.state}`
      : "Location",
  ],
  [
    "fas fa-link",
    <a
      href={"https://www.youtube.com/watch?v=example"}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:underline"
    >
      Portfolio Videos Link
    </a>,
  ],
  [
    "fab fa-linkedin",
    <a
      href={user?.linkedInId || "https://pk.linkedin.com/in/example"}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:underline"
    >
      LinkedIn
    </a>,
  ],
  [
    "fab fa-instagram",
    <a
      href={user?.instagramId || "https://www.instagram.com/example"}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:underline"
    >
      Instagram
    </a>,
  ],
  ["fas fa-map-pin", "Located in India"],
  [
    "fas fa-user",
    <>
      Since <span>{dateuser}</span>
    </>,
  ],
  ["fas fa-language", user?.language || "English"],
].map(([icon, content], index) => (
  <li className="flex items-start gap-3" key={`${icon}-${index}`}>
    <i className={`${icon} mt-1`} />
    {typeof content === "string" || typeof content === "number" ? (
      <span>{content}</span>
    ) : (
      content
    )}
  </li>
))}

      </ul>
    </div>
  );
};

export default Newprofile;
