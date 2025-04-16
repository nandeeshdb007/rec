import React from "react";
import Loader from "../loader";
import VideoCardMenu from "./video-card-menu";
import CopyLink from "./copy-link";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dot, Share2, User } from "lucide-react";

type Props = {
  User: {
    firstName: string | null;
    lastName: string | null;
    image: string | null;
  } | null;
  id: string;
  processing: boolean;
  Folder: {
    id: string;
    name: string;
  } | null;
  createdAt: Date;
  title: string | null;
  source: string;
  workSpaceId: string;
};

const VideoCard = (props: Props) => {
  //WIP: wire up date
  const daysAgo = Math.floor(
    (new Date().getTime() - props.createdAt.getTime()) / (24 * 60 * 60 * 1000)
  );

  console.log("props", props.User);
  return (
    <Loader
      state={props.processing}
      className="bg-[#171717] flex justify-center items-center border border-[#252525] rounded-xl"
    >
      <div className="group overflow-hidden cursor-pointer relative border bg-[#171717] border-[#252525] flex flex-col rounded-xl">
        <div className="absolute top-3 right-3 z-50 hidden group-hover:flex gap-x-3 ">
          <VideoCardMenu
            videoId={props.id}
            currentFolder={props.Folder?.id}
            currentFolderName={props.Folder?.name}
            currentWorkspace={props.workSpaceId}
          />
          <CopyLink
            className="p-0 h-5 hover:bg-transparent"
            videoId={props.id}
            variant={"ghost"}
          />
        </div>
        <Link
          href={`/preview/${props.id}`}
          className="hover:bg-[#252525] transition duration-150 flex flex-col justify-between h-full"
        >
          <video
            controls={false}
            preload="metadata"
            className="w-full aspect-video opacity-50 z-20"
          >
            <source
              src={`${process.env.NEXT_PUBLIC_CLOUD_FONT_STREAM_URL}/${props.source}#t=1`}
            />
          </video>
          <div className="px-5 py-3 flex flex-col gap-7-2 z-20">
            <h2 className="text-sm font-semibold text-[#bdbdbd]">
              {props.title}
            </h2>
            <div className="flex gap-x-2 items-center mt-4">
              <Avatar className=" w-8 h-8">
                <AvatarImage src={props.User?.image as string} />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="capitalize text-[#bdbdbd] text-xs">
                  {props.User?.firstName} {props.User?.lastName}
                </p>
                <p className="capitalize -ml-2 text-[#9d9d9d] text-xs flex  items-center">
                  <Dot /> {daysAgo === 0 ? "Today" : `${daysAgo}d ago`}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <span className="flex gap-x-1 items-center">
                <Share2 fill="#9d9d9d" className="text-[#9d9d9d]" size={12} />
                <p className="text-xs text-[#9d9d9d] capitalize">{props.User?.firstName}&lsquo;s Workspace</p>
              </span>
            </div>
          </div>
        </Link>
      </div>
    </Loader>
  );
};

export default VideoCard;
