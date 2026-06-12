"use client";
import React, { useEffect, useState } from "react";
import Header from "./_components/Header";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { UserDetailsContext } from "./_context/UserDetailsContext";

function Provider({ children }) {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    console.log("Provider - User loaded:", isLoaded);
    console.log("Provider - User data:", user);

    if (isLoaded && user) {
      checkUserAuth();
    }
  }, [isLoaded, user]);

  const checkUserAuth = async () => {
    try {
      setLoading(true);
      console.log("Provider - Checking user auth...");

      if (!user?.fullName || !user?.primaryEmailAddress?.emailAddress) {
        console.error("Missing user data:", {
          name: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
        });
        return;
      }

      const response = await axios.post("/api/users", {
        userName: user?.fullName,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      });

      console.log("Provider - API Response:", response.data);

      if (response.data.success) {
        console.log("Provider - Setting user details:", response.data.data);
        setUserDetails(response.data.data);
      } else {
        console.warn("Unexpected response:", response.data);
      }
    } catch (error) {
      console.error("Error checking user auth:", {
        message: error.message,
        response: error.response?.data,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div>
      <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
        <Header />
        <div className="px-10 lg:px-32 xl:px-48 2xl:px-56 p-4 pt-24">
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            </div>
          ) : (
            children
          )}
        </div>
      </UserDetailsContext.Provider>
    </div>
  );
}

export default Provider;
