"use client";

import ModeToggle from "@/components/mode-toggle";
import { WalletButton } from "@/components/solana/solana-provider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { UserProfile } from "@/components/user-profile";
import config from "@/config";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Banknote, Folder, HomeIcon, Settings } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function DashboardTopNav({ children }: { children: ReactNode }) {
  return (
    <div className="w-full">
      <header className="flex h-16 lg:h-[55px] items-center justify-between gap-4 border-b py-5">
        <div className="flex items-center gap-4">
          <Dialog>
            <SheetTrigger className="min-[1024px]:hidden p-2 transition">
              <HamburgerMenuIcon />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <Link href="/">
                  <SheetTitle>chainhunt</SheetTitle>
                </Link>
              </SheetHeader>
              <div className="flex flex-col space-y-3 mt-4">
                <DialogClose asChild>
                  <Link href="/dashboard">
                    <Button variant="outline" className="w-full">
                      <HomeIcon className="mr-2 h-4 w-4" />
                      Home
                    </Button>
                  </Link>
                </DialogClose>
                <DialogClose asChild>
                  <Link href="/dashboard/projects">
                    <Button variant="outline" className="w-full">
                      <Folder className="mr-2 h-4 w-4" />
                      Projects
                    </Button>
                  </Link>
                </DialogClose>
                <DialogClose asChild>
                  <Link href="/dashboard/finance">
                    <Button variant="outline" className="w-full">
                      <Banknote className="mr-2 h-4 w-4" />
                      Finance
                    </Button>
                  </Link>
                </DialogClose>
                <Separator className="my-3" />
                <DialogClose asChild>
                  <Link href="/dashboard/settings">
                    <Button variant="outline" className="w-full">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                  </Link>
                </DialogClose>
              </div>
            </SheetContent>
          </Dialog>
        </div>
        <div className="flex items-center gap-4">
          {config?.auth?.enabled && <UserProfile />}
          <ModeToggle />
          <WalletButton />
        </div>
      </header>
      <div>{children}</div>
    </div>
  );
}
