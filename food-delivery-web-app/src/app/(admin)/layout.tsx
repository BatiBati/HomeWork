"use client";

import { AdminPageStyleChange } from "./AdminPage/_components/AdminPageStyleChange";
import { Toaster } from "@/components/ui/sonner";

export default function AdminPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-screen flex">
      <AdminPageStyleChange />

      {children}
      <Toaster position="top-center" />
    </div>
  );
}
