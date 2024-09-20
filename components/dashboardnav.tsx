"use client";
import { useState } from "react";
import { WalletButton } from "@/components/solana/solana-provider";
import ModeToggle from "@/components/mode-toggle";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="flex justify-between items-center p-3">
      <Link href={'/'}>
        <Image src="/chains.png" alt="ChainHunt" width={180} height={100} />
      </Link>
      <div className="flex space-x-6">
        <a href="/dashboard/products" className="">
          Products
        </a>
        <a href="/dashboard/news" className="">
          News
        </a>
        <a href="/dashboard/blogs" className="">
          Blogs
        </a>
      </div>
      <div className="flex space-x-4">
        <ModeToggle />
        <DropdownMenu.Root>
  <DropdownMenu.Trigger asChild>
    <div className="px-4 py-2 bg-gray-200 rounded dark:text-black cursor-pointer">Register</div>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content className="bg-white p-2 mr-8 mt-2 rounded shadow-lg dark:text-black">
    <DropdownMenu.Item className="p-2 hover:bg-gray-100">Profile</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item className="p-2 hover:bg-gray-100">Archive</DropdownMenu.Item>
    <DropdownMenu.Sub>
      <DropdownMenu.SubTrigger className="p-2 hover:bg-gray-100">Register</DropdownMenu.SubTrigger>
      <DropdownMenu.SubContent className="bg-white p-2 rounded shadow-lg">
        <DropdownMenu.Item className="p-2 hover:bg-gray-100">
          <Link href="/dashboard/products/new">
            Register Product
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item className="p-2 hover:bg-gray-100">Move to folder…</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item className="p-2 hover:bg-gray-100">Advanced options…</DropdownMenu.Item>
      </DropdownMenu.SubContent>
    </DropdownMenu.Sub>
    <DropdownMenu.Separator />
    <DropdownMenu.Item className="p-2 hover:bg-gray-100">Add to favorites</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item className="p-2 text-red-600 hover:bg-red-100">Delete</DropdownMenu.Item>
    <DropdownMenu.Item>
      <WalletButton />
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>

      </div>
    </div>
  );
}
