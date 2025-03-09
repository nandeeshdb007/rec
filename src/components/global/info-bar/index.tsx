import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserButton } from "@clerk/nextjs";
import { FileVideo2Icon, Search, UploadIcon } from "lucide-react";
import React from "react";

type Props = {};

const InfoBar = (props: Props) => {
  return (
    <header className="pl-20 md:pl-[265px] fixed p-4 w-full flex items-center justify-between gap-4">
      <div className="flex gap-4 justify-center items-center border-2 rounded-full px-4 w-full max-w-lg">
        <Search size={25} className="text-[#707070]" />
        <Input
          className="bg-transparent  border-none !placeholder-neutral-500 !outline-none focus:border-none` focus:outline-none"
          placeholder="Search for people, projects, tags and folders"
        />
      </div>
      <div className="flex items-center gap-4  px-1 lg:px-4">
        <Button className="bg-white text-black hover:bg-[#9d9d9d]  flex items-center gap-2">
          <UploadIcon size={30} />{" "}
          <span className="flex items-center gap-2">Upload</span>
        </Button>
        <Button className="bg-white text-black hover:bg-[#9d9d9d]  flex items-center gap-2">
          <FileVideo2Icon size={30} />
          <span className="flex items-center gap-2">Record</span>
        </Button>
        <UserButton />
      </div>
    </header>
  );
};

export default InfoBar;
