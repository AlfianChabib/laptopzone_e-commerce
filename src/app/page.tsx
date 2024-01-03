"use client";
import Navbar from "@/components/main-nav";
import { loginStore } from "@/store/auth";
import { HomePropsType } from "@/types/frontend/page/home";
import { useEffect, useState } from "react";

export default function Home(props: HomePropsType) {
  const { userAccess } = loginStore();
  const [name, setName] = useState<boolean>(false);

  useEffect(() => {
    if (userAccess) {
      setName(true);
    }
  }, [userAccess]);
  return (
    <section className="flex flex-col w-full h-[1000px]">
      Hallo {name ? "Ariel" : "Tamu"}
    </section>
  );
}
