"use client";
import React from "react";
import Sidebar from "@/components/profie/Sidebar";
import MainContent from "@/components/profie/MainContent";
import { Tabs } from "@/components/ui/tabs";

export default function page() {
  return (
    <section className="flex w-full">
      <Tabs
        defaultValue="profile"
        className="flex relative w-full min-h-full max-w-7xl gap-4"
      >
        {/* left */}
        <Sidebar />
        {/* right */}
        <MainContent />
      </Tabs>
    </section>
  );
}
