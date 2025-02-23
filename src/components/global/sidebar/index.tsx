"use client";
import Image from "next/image";
import React from "react";

import { useRouter } from "next/navigation";

import { useQueryData } from "@/hooks/useQueryData";
import { getWorkspaces } from "@/actions/workspace";
import { WorkspaceProps } from "@/types/index.types";
import Modal from "../modal";
import { PlusCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectItem,
} from "@radix-ui/react-select";
import { Separator } from "@radix-ui/react-context-menu";

type Props = {
  activeWorkspaceId: string;
};

const SideBar = ({ activeWorkspaceId }: Props) => {
  const router = useRouter();
  const onChangeActiveWorkspace = (value: string) => {
    router.push(`/dashboard/${value}`);
  };

  const { data, isFetched } = useQueryData(["user-workspaces"], getWorkspaces);

  console.log("data", data);

  const { data: WorkSpace } = data as WorkspaceProps;

  return (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden ">
      <div className="bg-[#111111] p-4 gap-2 flex justify-center items-center mb-4 absolute top-0 left-0 right-0">
        <Image src={"/rec.svg"} height={40} width={40} alt="logo" />
        <p className="text-2xl">Rec</p>
      </div>
      <Select
        defaultValue={activeWorkspaceId}
        onValueChange={onChangeActiveWorkspace}
      >
        <SelectTrigger className="mt-16 bg-transparent text-neutral-400">
          <SelectValue placeholder="Select Workspace"></SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-[#111111] backdrop-blur-xl text-neutral-400">
          <SelectGroup>
            <SelectLabel>Workspaces</SelectLabel>
            <Separator />
            {WorkSpace.workSpace.map((work) => (
              <SelectItem
                key={work.id}
                value={work.id}
                className="text-neutral-400"
              >
                {work.name}
              </SelectItem>
            ))}
            {WorkSpace.members.length > 0 &&
              WorkSpace.members.map(
                (work) =>
                  work.Workspace && (
                    <SelectItem
                      value={work.Workspace.id}
                      key={work.Workspace.id}
                    >
                      {work.Workspace.name}
                    </SelectItem>
                  )
              )}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Modal
        trigger={
          <span className="text-sm cursir-pointer flex items-center justify-center border-t-neutral-800/90 hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2">
            <PlusCircle size={15} className="text-neutral-800/90 fill-neutral-500" />
            <span className="text-neutral-400 font-semibold text-xs">
              Invite To WorkSpace
            </span>
          </span>
        }
        title="Inivite To Workspce"
        description="Invite other users to your workspace"
      >
        WorkSpaceSearch
      </Modal>
    </div>
  );
};

export default SideBar;
