// "use client";
import { useHeaderTheme } from "@/lib/providers/HeaderTheme";
import Link from "next/link";

import type { Header } from "@/payload-types";

import { Logo } from "@/components/Logo/Logo";
import { HeaderNav } from "./Nav";

import { getMeUser } from "@/lib/utilities/getMeUser";

interface HeaderClientProps {
  header: Header;
}

export const HeaderClient: React.FC<HeaderClientProps> = async ({ header }) => {
  const { user } = await getMeUser();

  return (
    <header
      className="container relative z-20 py-8 flex justify-between"
      // {...(theme ? { "data-theme": theme } : {})}
    >
      <Link href="/" className="flex items-center gap-2">
        <Logo />
      </Link>
      <HeaderNav header={header} user={user} />
    </header>
  );
};
