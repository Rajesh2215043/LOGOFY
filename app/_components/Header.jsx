"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { motion } from "framer-motion";

function Header() {
  const { user } = useUser();
  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md px-4 md:px-10 lg:px-32 xl:px-48 2xl:px-56 p-4 flex justify-between items-center shadow-sm border-b border-white/20"
    >
      <Link href="/" className="flex-shrink-0">
        <Image src={"/logo2_o.png"} alt="Logo" width={150} height={100} className="w-[120px] md:w-[150px]" priority />
      </Link>
      <div className="flex items-center gap-3 md:gap-4">
        {user ? (
          <Link href="/dashboard">
            <Button variant="outline" className="hidden sm:flex hover:bg-pink-50 hover:text-primary transition-colors border-pink-200">
              Dashboard
            </Button>
          </Link>
        ) : (
          <Button className="bg-gradient-to-r from-primary to-pink-500 hover:from-black hover:to-gray-800 text-white shadow-md hover:shadow-lg transition-all transform hover:scale-105 text-sm md:text-base px-3 md:px-4 py-1.5 md:py-2">
            Get Started
          </Button>
        )}
        <UserButton appearance={{ elements: { avatarBox: "w-8 h-8 md:w-10 md:h-10" } }} />
      </div>
    </motion.div>
  );
}

export default Header;
