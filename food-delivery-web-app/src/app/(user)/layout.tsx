"use client";


import { Footer } from "../_components/Footer";
import { Header } from "../_components/Header";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex items-start">
        <Header />
      </div>
      <div className="min-h-[90vh]"> {children}</div>
      <div className="flex items-end">
        <Footer />
      </div>
      ;

    </div>
  );
}
