// components/ProfileCard.tsx
"use client";

import Image from "next/image";
import styles from "./ProfileCard.module.css";
import { useEffect, useState } from "react";
import { User } from "@/model/User";

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

  return (
    <div className={styles.card}>
      <div className={styles.avatarContainer}>
        <Image
          src={"/Groupie.jpg"}
          alt="User Avatar"
          width={100}
          height={100}
        />
      </div>
      <h2 className={styles.name}>{user?.username || "anonymous"}</h2>
      <p className={styles.username}>{user?.email || "anonymous"}</p>
      <hr className={styles.divider} />
      <ul className={styles.details}>
        <li>
          <span>📍</span> Located in India
        </li>
        <li>
          <span>👤</span> Joined in May 2021
        </li>
        <li>
          <span>🗣️</span> English
        </li>
      </ul>
      <p className={styles.workingHours}>Preferred working hours</p>
    </div>
  );
};

export default Newprofile;
