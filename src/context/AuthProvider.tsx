"use client";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState, createContext, useContext } from "react";

const ProfileContext = createContext<{ user: any; loading: boolean }>({ user: null, loading: true });

export const useProfile = () => useContext(ProfileContext);

export default function AuthProvidder({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/profile")
      .then(res => res.json())
      .then(data => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SessionProvider>
      <ProfileContext.Provider value={{ user, loading }}>
        {children}
      </ProfileContext.Provider>
    </SessionProvider>
  );
}
