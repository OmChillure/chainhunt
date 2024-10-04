import { ArrowRight, ChevronRight, Github } from "lucide-react";
import Link from "next/link";
import { BorderBeam } from "../magicui/border-beam";
import { Button } from "../ui/button";
import Image from "next/image";
import { TITLE_TAILWIND_CLASS } from "@/utils/constants";
import { Separator } from "../ui/separator";
import { cn } from "@/utils/cn";
import AnimatedGradientText from "../ui/animated-gradient-text";

export default function HeroSection() {
  return (
    <section
      className="flex flex-col items-center justify-center leading-6"
      aria-label="Nextjs Starter Kit Hero"
    >
      <div className="h-[72vh] flex flex-col items-center justify-center">
        <AnimatedGradientText>
          <div
            className={cn(
              `absolute inset-0 block size-full animate-gradient bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:var(--bg-size)_100%] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]`,
              `p-px ![mask-composite:subtract]`
            )}
          />
          🎉 <Separator className="mx-2 h-4" orientation="vertical" />
          <span
            className={cn(
              `animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
              `inline`
            )}
          >
            Beta Version (Devnet Only)
          </span>
          <ChevronRight className="ml-1 size-4 text-gray-500" />
        </AnimatedGradientText>
        <h1
          className={`${TITLE_TAILWIND_CLASS} text-[50px] mt-10 scroll-m-20 font-semibold tracking-tight text-center max-w-[1120px] bg-gradient-to-b dark:text-white`}
        >
          <span className="bg-gradient-to-r from-[#c9184a] via-[#ff4d6d] to-[#ff758f] bg-clip-text text-transparent">
            Chainhunt:
          </span>{" "}
          Solana product hunt
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-500 text-center text-xl mt-6 dark:text-gray-400">
          The onestop solution to hunt and upvote proucts build on Solana.
        </p>
        <div className="flex justify-center items-center gap-3 mb-10">
          <Link href="/dashboard" className="mt-5">
            <Button className="animate-buttonheartbeat rounded-md bg-blue-600 hover:bg-blue-500 text-sm font-semibold text-white">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <div className="relative flex max-w-6xl justify-center overflow-hidden mt-7">
          <div className="relative rounded-xl">
            <Image
              src="https://utfs.io/f/31dba2ff-6c3b-4927-99cd-b928eaa54d5f-5w20ij.png"
              alt="Nextjs Starter Kit Dashboard Preview"
              width={1100}
              height={550}
              priority={true}
              className="block rounded-[inherit] border object-contain shadow-lg dark:hidden"
            />
            <Image
              src="https://utfs.io/f/69a12ab1-4d57-4913-90f9-38c6aca6c373-1txg2.png"
              width={1100}
              height={550}
              alt="Nextjs Starter Kit Dark Mode Dashboard Preview"
              priority={true}
              className="dark:block rounded-[inherit] border object-contain shadow-lg hidden"
            />
            <BorderBeam size={250} duration={12} delay={9} />
          </div>
        </div>
      </div>
    </section>
  );
}
