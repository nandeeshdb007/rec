"use client";
import Image from "next/image";
import React from "react";

import { usePathname, useRouter } from "next/navigation";

import { useQueryData } from "@/hooks/useQueryData";
import { getWorkspaces } from "@/actions/workspace";
import { NotificationProps, WorkspaceProps } from "@/types/index.types";
import Modal from "../modal";
import { Menu, MenuIcon, PlusCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import Search from "../search";
import { MENU_ITEMS } from "@/constants";
import SideBarItem from "./sidebar-item";
import { getNotifications } from "@/actions/user";
import WorkSpacePlaceHolder from "./workspace-placeholder";
import GlobalCard from "../global-card";
import { Button } from "@/components/ui/button";
import Loader from "../loader";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type Props = {
  activeWorkspaceId: string;
};

const SideBar = ({ activeWorkspaceId }: Props) => {
  //WIP: upgrate button func
  const router = useRouter();
  const onChangeActiveWorkspace = (value: string) => {
    router.push(`/dashboard/${value}`);
  };

  const pathName = usePathname();
  const { data, isFetched } = useQueryData(["user-workspaces"], getWorkspaces);
  const { data: WorkSpace } = data as WorkspaceProps;
  const currentWorkSpace = WorkSpace.workSpace.find(
    (s) => s.id == activeWorkspaceId
  );

  const menuItems = MENU_ITEMS(activeWorkspaceId);
  const { data: notifications } = useQueryData(
    ["user-notifications"],
    getNotifications
  );
  const { data: count } = notifications as NotificationProps;

  const SideBarSection = (
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
            <div />
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
      {currentWorkSpace?.type == "PUBLIC" &&
        WorkSpace.subscription?.plan == "PRO" && (
          <Modal
            trigger={
              <span className="text-sm cursir-pointer flex items-center justify-center border-t-neutral-800/90 hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2">
                <PlusCircle
                  size={15}
                  className="text-neutral-800/90 fill-neutral-500"
                />
                <span className="text-neutral-400 font-semibold text-xs">
                  Invite To WorkSpace
                </span>
              </span>
            }
            title="Inivite To Workspce"
            description="Invite other users to your workspace"
          >
            <Search workspaceId={activeWorkspaceId} />
          </Modal>
        )}
      <div className="w-full text-[#9d9d9d] font-bold mt-4">
        <nav className="w-full">
          <ul>
            {menuItems.map((item, index) => (
              <SideBarItem
                key={`side-bar-${index}`}
                href={item.href}
                icon={item.icon}
                selected={pathName == item.href}
                title={item.title}
                notification={
                  (item.title === "Notification" &&
                    count._count &&
                    count._count.notification) ||
                  0
                }
              />
            ))}
          </ul>
        </nav>
        <div className="w-4/5 border border-white/10" />
        <p className="w-full text-[#9d9d9d] font-bold mt-4">Workspaces</p>
        {WorkSpace.workSpace.length === 1 && WorkSpace.members.length === 0 && (
          <div className="w-full ">
            <p className="text-[#3c3c3c] font-medium text-sm">
              {WorkSpace.subscription?.plan == "FREE"
                ? "Upgrate to create work spaces"
                : "No work spaces"}
            </p>
          </div>
        )}
        <nav className="w-full">
          <ul className="h-[150px] overflow-auto overflow-x-hidden fade-layer">
            {WorkSpace.workSpace.length > 0 &&
              WorkSpace.workSpace.map(
                (item) =>
                  item.type !== "PERSONAL" && (
                    <SideBarItem
                      key={item.id}
                      href={`/dashboard/${item.id}`}
                      selected={pathName === `/dashboard/${item.id}`}
                      title={item.name}
                      notification={0}
                      icon={
                        <WorkSpacePlaceHolder>
                          {item.name.charAt(0)}
                        </WorkSpacePlaceHolder>
                      }
                    />
                  )
              )}
            {WorkSpace.members.length > 0 &&
              WorkSpace.members.map((item) => (
                <SideBarItem
                  key={item.Workspace.id}
                  href={`/dashboard/${item.Workspace.id}`}
                  selected={pathName === `/dashboard/${item.Workspace.id}`}
                  title={item.Workspace.name}
                  notification={0}
                  icon={
                    <WorkSpacePlaceHolder>
                      {item.Workspace.name.charAt(0)}
                    </WorkSpacePlaceHolder>
                  }
                />
              ))}
          </ul>
        </nav>
        <div className="w-4/5 border border-white/10" />
        {WorkSpace.subscription?.plan === "FREE" && (
          <GlobalCard
            title="Upgrade to pro"
            description="Unlock AI features like transcription, AI summary and more."
          >
            <Button className="text-sm bg-white text-black w-full mt-2 hover:text-white">
              <Loader state={false}>Upgrade</Loader>
            </Button>
          </GlobalCard>
        )}
      </div>
    </div>
  );
  return (
    <div className="full">
      {/* Infobar*/}
      {/*Sheet mobile and desktop */}
      <div className="md:hidden fixed my-4">
        <Sheet>
          <SheetTrigger asChild className="ml-2">
            <Button className="mt-0.5 " variant={"ghost"}>
              <MenuIcon className="w-24 h-24" />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="p-0 w-fit h-full">
            <span className="hidden">
              <SheetTitle></SheetTitle>
            </span>
            {SideBarSection}
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:block hidden h-full">{SideBarSection}</div>
    </div>
  );
};

export default SideBar;
