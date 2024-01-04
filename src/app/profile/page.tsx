import React from "react";
import Sidebar from "@/components/profie/Sidebar";
import MainContent from "@/components/profie/MainContent";
import { Tabs } from "@/components/ui/tabs";
import Navbar from "@/components/main-nav";
import { fetchGet } from "@/lib/fetch/user";
import { cookies } from "next/headers";
import { JwtPayload, decode } from "jsonwebtoken";

const getUserData = async () => {
  const token = cookies().get("user_access")?.value;
  const decoded = decode(token as string);
  const { id } = decoded as JwtPayload;
  const response = await fetchGet(id).catch((error) => {
    throw new Error(error);
  });
  return response.data;
};

export default async function page() {
  const dataUser = await getUserData();
  return (
    <section className="flex flex-col min-h-screen w-full">
      <Navbar dataUser={dataUser} />
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
