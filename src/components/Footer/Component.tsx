import { getCachedGlobal } from "@/lib/utilities/getGlobals";
import Link from "next/link";
import React from "react";

import type { Footer } from "@/payload-types";

import { ThemeSelector } from "@/lib/providers/Theme/ThemeSelector";
import { CMSLink } from "@/components/Link";
import { Logo } from "@/components/Logo/Logo";
export async function Footer() {
  const footer: Footer = await getCachedGlobal("footer")();

  const navItems = footer?.navItems || [];

  return (
    <footer className="border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-12 gap-8 flex flex-col md:flex-row md:justify-between">
        <div className="flex flex-col items-start">
          <Link className="flex items-center" href="/">
            <Logo />
          </Link>
          <span className="mt-3 text-sm">Spark your wanderlust in Africa!</span>
        </div>
        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />;
            })}
          </nav>
        </div>
      </div>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">
          © 2024 Raki. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </footer>
  );
}
