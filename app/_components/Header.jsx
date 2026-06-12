"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

function Header() {
  const { user } = useUser();
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm px-10 lg:px-32 xl:px-48 2xl:px-56 p-4 flex justify-between items-center shadow-sm">
      <Link href="/">
        <Image src={"/logo2_o.png"} alt="Logo" width={150} height={100} />
      </Link>
      <div className="flex items-center gap-3">
        {user ? (
          <Link href="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
        ) : (
          <Button>Get Started</Button>
        )}
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
