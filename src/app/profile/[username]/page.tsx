import React from "react";
import Sidebar from "@/components/profie/Sidebar";
import MainContent from "@/components/profie/MainContent";
import { Tabs } from "@/components/ui/tabs";
import Navbar from "@/components/main-nav";
import { fetchGet } from "@/lib/fetch/user";

const getUserData = async (slug: string) => {
  const response = await fetchGet(slug).catch((error) => {
    throw new Error(error);
  });
  return response.data;
};

export default async function page({
  params,
}: {
  params: { username: string };
}) {
  const username = params.username;
  console.log(username);
  const dataUser = await getUserData(username);

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
