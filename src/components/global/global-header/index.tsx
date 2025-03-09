"use client";
import { WorkSpace } from "@prisma/client";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  workSpace: WorkSpace;
};

const GlobalHeader = ({ workSpace }: Props) => {
  const pathName = usePathname().split(`/dashboard/${workSpace?.id}`)[1];
  return (
    <article className="flex flex-col gap-2">
      <span className="text-[#707070] text-xs">
        {workSpace?.type.toLocaleUpperCase()}
      </span>
      <h1 className="text-4xl font-bold">
        {pathName && !pathName.includes("folder")
          ? pathName.charAt(0).toLocaleUpperCase() +
            pathName.slice(1).toLocaleLowerCase()
          : "My Library"}
      </h1>
    </article>
  );
};

export default GlobalHeader;
