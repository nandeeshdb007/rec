import { Button } from "@/components/ui/button";
import { MenuIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LandingPageNavBar = () => {
  return (
    <div className="flex w-full justify-between items-center">
      <div className="text-3xl font-semibold flex items-center gap-x-3">
        <MenuIcon className="w-6 h-6" />
        <Image alt="logo" src="/rec.svg" width={40} height={40} />
        Rec
      </div>
      <div className="hidden gap-x-10 items-center lg:flex">
        <Link
          href={"/"}
          className="bg-[#7320DD] py-2 px-5 font-semibold text-lg rounded-full hover:bg-[#7320DD]/80"
        >
          Home
        </Link>
        <Link href={"/"}>Pricing</Link>
        <Link href={"/"}>Contact</Link>
      </div>
      <Link href={"/auth/sign-in"}>
        <Button className="text-base flex gap-x-2 bg-white text-black hover:bg-white">
          <UserIcon className="w-6 h-6" />
          Login
        </Button>
      </Link>
    </div>
  );
};

export default LandingPageNavBar;
