import React from "react";
import Sidebar from "@/components/profie/Sidebar";
import MainContent from "@/components/profie/MainContent";
import { Tabs } from "@/components/ui/tabs";
import Navbar from "@/components/main-nav";

export default async function page({
  params,
}: {
  params: { username: string };
}) {
  const username = params.username;

  return (
    <section className="flex flex-col min-h-screen w-full">
      <Navbar />
      <Tabs
        defaultValue="profile"
        className="flex relative w-full h-full max-w-7xl gap-4"
      >
        {/* left */}
        <Sidebar />
        {/* right */}
        <MainContent />
      </Tabs>
    </section>
  );
}
