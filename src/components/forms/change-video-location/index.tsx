import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useMoveVideos } from "@/hooks/useFolders";
import React from "react";

type Props = {
  videoId: string;
  currentFolder?: string;
  currentWorkspace?: string;
  currentFolderName?: string;
};

const ChangeVideoLocation = ({
  videoId,
  currentFolder,
  currentWorkspace,
  currentFolderName,
}: Props) => {
  //WIP: wire up te use move folder
  const {
    onFormSubmit,
    errors,
    register, //71119
    isFetching,
    isPending,
    isFolders,
    folders,
    workspaces,
  } = useMoveVideos(videoId, currentWorkspace!);

  const folder = folders.find((f) => f.id === currentFolder);
  const workspace = workspaces.find((w) => w.id === currentWorkspace);
  return (
    <form className="flex flex-col gap-y-5">
      <div className="border rounded-xl p-5">
        <h2 className="text-xs mb-5 text-[#a4a4a4]">
          Current
          {workspace && (
            <p className="text-[#a4a4a4]"> {workspace.name}Workspace</p>
          )}
          <p className="text-[#a4a4a4] text-sm">This video has no folder</p>
        </h2>
      </div>
      <Separator orientation="horizontal" />
      <div className="flex flex-col gap-y-5 p-5 border rounded-2xl">
        <h2 className="text-xs gap-y-2 flex">To</h2>
        <Label className="flex flex-col gap-y-2">
          <p className="text-xs">Workspace</p>
          <select
            className="rounded-xl text-base bg-transparent"
            // {...register("workspace_id")}
          >
            <option value={"something"}>Value</option>
          </select>
        </Label>
      </div>
    </form>
  );
};

export default ChangeVideoLocation;
