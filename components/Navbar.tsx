"use client";
import { signOutAction } from "@/app/actions";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";

type NavbarProps = {
  user: any;
};

export const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleAvatarClick = () => setDropdownOpen((open) => !open);

  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 bg-gray-900 text-white shadow">
      {/* Left side */}
      <div className="flex items-center gap-8">
        <Link href="/home" className="font-bold text-xl">
          Writer's Prompt
        </Link>
        <Link href="/explore" className="hover:underline">
          Explore
        </Link>
        <Link href="/about" className="hover:underline">
          About
        </Link>
      </div>
      {/* Right side */}
      <div className="flex items-center gap-4 relative">
        <Link href="/create" className="hover:underline">
          Create a Prompt
        </Link>
        {!user ? (
          <>
            <Link
              href="/sign-in"
              className="border-white border w-full px-4 py-2"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="border-white border w-full px-4 py-2"
            >
              Sign up
            </Link>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={handleAvatarClick}
              className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-lg font-bold focus:outline-none"
            >
              {user.email?.charAt(0).toUpperCase() || "U"}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-10">
                <Link
                  href="/profile"
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Button onClick={signOutAction} variant={"default"}>
                  Sign out
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
