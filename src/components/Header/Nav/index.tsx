"use client";

import React from "react";

import type { Header as HeaderType, User } from "@/payload-types";

import { CMSLink } from "@/components/Link";
import Link from "next/link";

import { SearchIcon } from "lucide-react";
import { Button } from "@/components/Button";
import AuthModal from "@/features/users/Auth";

export const HeaderNav: React.FC<{ header: HeaderType; user: User }> = ({
  header,
  user,
}) => {
  const navItems = header?.navItems || [];

  const handleLogout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log(data);

      // Replace router.push with window.location.href
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="flex gap-8 items-center">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" />;
      })}
      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
      {user ? (
        <Button variant="ghost" onClick={handleLogout}>
          Log Out
        </Button>
      ) : (
        <AuthModal />
      )}
    </nav>
  );
};
