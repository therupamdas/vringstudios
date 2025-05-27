"use client";

import Image from "next/image";
import styles from "./ProfileCard.module.css";
import { useEffect, useState } from "react";
import { User } from "@/model/User";
import { EditProfile } from "./Editprofile";

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
  const infoItems = [
    {
      icon: "fas fa-building",
      content: user?.college || "College",
    },
    {
      icon: "fas fa-map-marker-alt",
      content:
        user?.city && user?.state ? `${user.city}, ${user.state}` : "Location",
    },
    {
      icon: "fas fa-link",
      content: (
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
          key="portfolio-link" // added key here
        >
          Portfolio Videos Link
        </a>
      ),
    },
    {
      icon: "fab fa-linkedin",
      content: (
        <a
          href={user?.linkedInId || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
          key="linkedin-link"
        >
          LinkedIn
        </a>
      ),
    },
    {
      icon: "fab fa-instagram",
      content: (
        <a
          href={user?.instagramId || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
          key="instagram-link"
        >
          Instagram
        </a>
      ),
    },
    {
      icon: "fas fa-map-pin",
      content: "Located in India",
    },
    {
      icon: "fas fa-user",
      content: (
        <span key="since-date">
          Since <span>{dateuser}</span>
        </span>
      ),
    },
    {
      icon: "fas fa-language",
      content: user?.language || "English",
    },
  ];
  return (
    <div className={styles.card}>
      <div className={styles.avatarContainer}>
        <Image
          className={styles.avatar}
          src={user?.image || "/defaultuser.png"}
          alt="User Avatar"
          width={1080}
          height={1080}
        />
      </div>
      <h2 className={styles.name}>{user?.username || "anonymous"}</h2>
      <p className={styles.username}>{user?.email || "anonymous"}</p>
      <p className={styles.workingHours}>{user?.bio || "#Bio Goes Here...."}</p>
      <hr className={styles.divider} />
      <EditProfile />
      <ul>
        {infoItems.map(({ icon, content }, index) => (
          <li className="flex items-start gap-3" key={`${icon}-${index}`}>
            <i
              className={`${icon} text-gray-500 min-w-[20px] text-base pt-1`}
            ></i>
            <span className="leading-snug">{content}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Newprofile;
