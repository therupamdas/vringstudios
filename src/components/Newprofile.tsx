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
      <ul className="text-sm text-gray-800 space-y-3 mt-4">
        {[
          ["fas fa-building", user?.college || "College"],
          ["fas fa-map-marker-alt", user?.city + ", " + user?.state || "Location"],
          [
            "fas fa-link",
            <a
              href="#"
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
              href={user?.linkedInId || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>,
          ],
          [
            "fab fa-linkedin",
            <a
              href={user?.instagramId || "#"}
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
        ].map(([icon, text], index) => (
          <li className="flex items-start gap-3" key={`${icon}-${index}`}>
            <i className={`${icon} text-gray-500 min-w-[20px] text-base pt-1`}></i>
            <span className="leading-snug">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Newprofile;
