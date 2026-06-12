"use client";

import { UserDetailsContext } from "@/app/_context/UserDetailsContext";
import React, { useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
function Info() {
  const { userDetails } = useContext(UserDetailsContext);

  useEffect(() => {
    console.log("Info Component - userDetails:", userDetails);
  }, [userDetails]);

  return (
    <div>
      <div>
        <h2 className="text-3xl font-bold text-primary">
          Welcome, {userDetails?.name || "User"}
        </h2>
        <p className="text-gray-500 text-xl">
          This is your dashboard where you can manage your account and see your
          logo history.
        </p>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mt-4">Dashboard</h2>
        <Link href="/create">
          <Button>+ Create New Logo</Button>
        </Link>
      </div>
    </div>
  );
}

export default Info;
