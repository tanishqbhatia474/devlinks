"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "./components/Header";
import LinkTreeEdit from "./components/Newlink";
import LinkTree from "./components/Linktree";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [savedLinks, setSavedLinks] = useState([]);

  // Save links to ensure data sync between LinkTree and LinkTreeEdit components
  const handleSaveLinks = (links) => {
    // Save the links in state
    setSavedLinks([...links]);
  
    // Save the links to LocalStorage
    localStorage.setItem("savedLinks", JSON.stringify(links));
  };
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") return null;
  console.log("session", session);
  return (
    <div className="bg-purple-500">
      <Header />
      <div className="">
      <LinkTree userId={session.user.id} links={savedLinks} setLinks={handleSaveLinks} />
      </div>
    </div>
  );
};

export default Page;
