import React from "react";
import Loader from "../loader";
import VideoCardMenu from "./video-card-menu";

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
  return (
    <Loader state={false}>
      <div className="overflow-hidden cursor-pointer relative border border-[#252525] flex flex-col rounded-xl">
        <div className="absolute top-3 right-3 z-50 flex flex-col gap-y-3">
          <VideoCardMenu
            videoId={props.id}
            currentFolder={props.Folder?.id}
            currentFolderName={props.Folder?.name}
            currentWorkspace={props.workSpaceId}
          />
        </div>
      </div>
    </Loader>
  );
};

export default VideoCard;
