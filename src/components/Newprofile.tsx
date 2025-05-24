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

  console.log("User createdAt raw:", user?.createdAt);
  const dateuser = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
      })
    : "N/A";

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
      <p className={styles.workingHours}>#Bio Goes Here....</p>
      
      <hr className={styles.divider} />
      <EditProfile />
      <ul className="text-sm text-gray-800 space-y-3 mt-4">
        {[
          ["fas fa-building", "NIT Rourkela"],
          ["fas fa-map-marker-alt", "Kolkata, West Bengal"],
          [
            "fas fa-link",
            <a
              href=""
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
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Rupam Das
            </a>,
          ],
          ["fab fa-instagram", "fiwithrupamm"],
          ["fas fa-map-pin", "Located in India"],
          [
            "fas fa-user",
            <>
              Since <span>{dateuser}</span>
            </>,
          ],
          ["fas fa-language", "English"],
        ].map(([icon, text], i) => (
          <li className="flex items-start gap-3" key={i}>
            <i
              className={`${icon} text-gray-500 min-w-[20px] text-base pt-1`}
            ></i>
            <span className="leading-snug">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Newprofile;
