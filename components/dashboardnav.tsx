"use client";
import { useState } from "react";
import { WalletButton } from "@/components/solana/solana-provider";
import ModeToggle from "@/components/mode-toggle";

export default function NavBar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="flex justify-between p-4">
      <a href="/" className="hover:underline">
        Dashboard
      </a>
      <div className="flex space-x-6">
        <a href="/launches" className="hover:underline">
          Launches
        </a>
        <a href="/products" className="hover:underline">
          Products
        </a>
        <a href="/news" className="hover:underline">
          News
        </a>
        <a href="/blogs" className="hover:underline">
          Blogs
        </a>
      </div>
      <div className="flex space-x-4">
        <ModeToggle />
        <WalletButton />
      </div>
    </div>
  );
}
