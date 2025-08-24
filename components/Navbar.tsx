"use client";

import { User } from "@supabase/supabase-js";
import { Menu, X } from "lucide-react";

import React, { useState } from "react";

import Link from "next/link";

import { signOutAction } from "@/app/actions";

import { ThemeSwitcher } from "./ThemeSwitcher";
import { Button } from "./ui/button";

type NavbarProps = {
  user: User;
};

export const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAvatarClick = () => setDropdownOpen((open) => !open);
  const toggleMobileMenu = () => setMobileMenuOpen((open) => !open);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="w-full bg-background border-b border-border text-foreground shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl">
              Project Author
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/explore" className="hover:underline">
              Explore
            </Link>
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link
              href="/test-theme"
              className="hover:underline text-sm text-muted-foreground"
            >
              Test Theme
            </Link>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/create" className="hover:underline">
              Create a Prompt
            </Link>
            <ThemeSwitcher />
            {!user ? (
              <>
                <Link
                  href="/sign-in"
                  className="border-border border px-4 py-2 rounded hover:bg-accent"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className="border-border border px-4 py-2 rounded hover:bg-accent"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={handleAvatarClick}
                  className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-lg font-bold text-primary-foreground focus:outline-none hover:bg-primary/90"
                >
                  {user.email?.charAt(0).toUpperCase() || "U"}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-background text-foreground rounded shadow-lg z-10 border border-border">
                    <Link
                      href="/profile"
                      className="block w-full text-left px-4 py-2 hover:bg-accent rounded-t"
                    >
                      Profile
                    </Link>
                    <Button
                      onClick={signOutAction}
                      variant="default"
                      className="w-full rounded-t-none"
                    >
                      Sign out
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeSwitcher />
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-foreground hover:bg-accent focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-4 space-y-4">
            {/* Navigation Links */}
            <div className="space-y-3">
              <Link
                href="/explore"
                className="block py-2 hover:bg-accent rounded px-2"
                onClick={closeMobileMenu}
              >
                Explore
              </Link>
              <Link
                href="/about"
                className="block py-2 hover:bg-accent rounded px-2"
                onClick={closeMobileMenu}
              >
                About
              </Link>
              <Link
                href="/test-theme"
                className="block py-2 hover:bg-accent rounded px-2 text-muted-foreground"
                onClick={closeMobileMenu}
              >
                Test Theme
              </Link>
              <Link
                href="/create"
                className="block py-2 hover:bg-accent rounded px-2"
                onClick={closeMobileMenu}
              >
                Create a Prompt
              </Link>
            </div>

            {/* Auth Section */}
            {!user ? (
              <div className="space-y-3 pt-4 border-t border-border">
                <Link
                  href="/sign-in"
                  className="block w-full text-center border-border border px-4 py-2 rounded hover:bg-accent"
                  onClick={closeMobileMenu}
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className="block w-full text-center border-border border px-4 py-2 rounded hover:bg-accent"
                  onClick={closeMobileMenu}
                >
                  Sign up
                </Link>
              </div>
            ) : (
              <div className="space-y-3 pt-4 border-t border-border">
                <Link
                  href="/profile"
                  className="block w-full text-center border-border border px-4 py-2 rounded hover:bg-accent"
                  onClick={closeMobileMenu}
                >
                  Profile
                </Link>
                <Button
                  onClick={() => {
                    signOutAction();
                    closeMobileMenu();
                  }}
                  variant="default"
                  className="w-full"
                >
                  Sign out
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
