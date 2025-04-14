import React from "react";
import Modal from "../modal";
import { MoveIcon } from "lucide-react";
import ChangeVideoLocation from "@/components/forms/change-video-location";

type Props = {
  videoId: string;
  currentFolder?: string;
  currentWorkspace?: string;
  currentFolderName?: string;
};

const VideoCardMenu = ({
  videoId,
  currentFolder,
  currentWorkspace,
  currentFolderName,
}: Props) => {
  return (
    <Modal
      className="flex items-center cursor-pointer gap-x-2"
      title="Move to new Workspace/Folder"
      description="This action cannot be undone. This will permanently delete your account and remove your data from our server."
      trigger={
        <MoveIcon size={20} fill={"#a4a4a4"} className="text-[#a4a4a4]" />
      }
    >
      <ChangeVideoLocation
        videoId={videoId}
        currentFolder={currentFolder}
        currentFolderName={currentFolderName}
        currentWorkspace={currentWorkspace}
      />
    </Modal>
  );
};

export default VideoCardMenu;
