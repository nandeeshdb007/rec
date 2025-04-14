"use client";
import { getAllUserVideos } from "@/actions/workspace";
import { useQueryData } from "@/hooks/useQueryData";
import { cn } from "@/lib/utils";
import { VideosProps } from "@/types/index.types";
import { VideoIcon } from "lucide-react";
import React from "react";
import VideoCard from "./video-card";

type Props = {
  folderId: string;
  videosKey: string;
  workspaceId: string;
};

const video = {
    User: {
      firstName: "John",
      lastName: "Doe",
      image: "https://example.com/profile.jpg",
    },
    id: "123456",
    processing: false,
    Folder: {
      id: "folder_001",
      name: "Project Files",
    },
    createdAt: new Date("2024-03-12T10:30:00Z"),
    title: "Sample Document",
    source: "System Upload",
  };

const Videos = ({ folderId, videosKey, workspaceId }: Props) => {
  //WIP: ADD videos logic
  const { data: videoData } = useQueryData([videosKey], () =>
    getAllUserVideos(folderId)
  );

  const { status: videoStatus, data: videos } = videoData as VideosProps;
  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <VideoIcon />
          <h2 className="text-[#bdbdb]">Videos</h2>
        </div>
      </div>
      <section
        className={cn(
          videoStatus !== 200
            ? "p-5"
            : "grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
        )}
      >
        {/* {videoStatus === 200 ? (
          videos.map((video) => <VideoCard />)
        ) : (
          <p className="text-[#bdbdbd]">No vidos in workspace</p>
        )} */}
        <VideoCard workSpaceId={workspaceId} {...video} />
      </section>
    </div>
  );
};

export default Videos;
