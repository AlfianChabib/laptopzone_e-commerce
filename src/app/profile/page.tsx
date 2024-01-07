import React from "react";
import { sessionData } from "@/lib/fetch/user";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { Session } from "next-auth";
import Sidebar from "@/components/profie/Sidebar";
import MainContent from "@/components/profie/MainContent";
import { Tabs } from "@/components/ui/tabs";
import Navbar from "@/components/main-nav";

const getUserdata = async (session: Session) => {
  if (!session) {
    return null;
  }
  let { id } = session as Session & { id: string | undefined };
  const response = await sessionData(id);
  return response;
};

export default async function page() {
  const session = await getServerSession(authOptions);
  let sessionData;
  if (session) {
    sessionData = await getUserdata(session);
  }

  return (
    <section className="flex flex-col min-h-screen w-full">
      <Navbar sessionData={sessionData} />
      <Tabs
        defaultValue="profile"
        className="flex relative w-full with-navbar max-w-7xl gap-4"
      >
        {/* left */}
        <Sidebar />
        {/* right */}
        <MainContent />
      </Tabs>
    </section>
  );
}
