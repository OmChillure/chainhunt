"use client";

import { Separator } from "@/components/ui/separator";
import clsx from "clsx";
import { Banknote, Folder, HomeIcon, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTasks } from "react-icons/fa";

export default function DashboardSideBar() {
  const pathname = usePathname();

  return (
    <div className="lg:block hidden h-full">
      <div className="flex h-full w-full max-h-screen flex-col gap-2 ">
        <div className="flex h-[55px] items-center justify-between border-b px-3 w-[60vw]">
          <Link className="flex items-center gap-2 font-semibold ml-1" href="/">
            <span className="">Nextjs Starter Kit</span>
          </Link>
          <div className="flex gap-10">
            <Link href="/dashboard/launches">
              <span className="">Launches</span>
            </Link>

            <Link href="/dashboard/products">Products</Link>
            <Link href="/dashboard/news">News</Link>
            <Link href="/dashboard/blogs">Blogs</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
