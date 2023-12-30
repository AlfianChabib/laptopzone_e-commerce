import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full min-h-screen items-center justify-center px-2">
      {children}
    </section>
  );
}
