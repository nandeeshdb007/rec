import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
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
    register, 
    isFetching,
    isPending,
    isFolders,
    folders,
    workspaces,
  } = useMoveVideos(videoId, currentWorkspace!, currentFolder!);

  const folder = folders.find((f) => f.id === currentFolder);
  const workspace = workspaces.find((w) => w.id === currentWorkspace);

  return (
    <form className="flex flex-col gap-y-5" onSubmit={onFormSubmit}>
      <div className=" rounded-xl p-5">
        <h2 className="text-xs  text-[#a4a4a4]">Current Workspaces</h2>
        {workspace && <p>{workspace.name}</p>}
        <h2 className="text-xs text-[#a4a4a4] mt-4">Current Folder</h2>
        {folder ? (
          <p>{folder?.name}</p>
        ) : (
          <p className="text-[#a4a4a4] text-sm">This video has no folder</p>
        )}
      </div>
      <Separator orientation="horizontal" />
      <div className="flex flex-col gap-y-5 p-5 border rounded-2xl">
        <h2 className="text-xs gap-y-2 flex">To</h2>
        <Label className="flex flex-col gap-y-2">
          <p className="text-xs">Workspace</p>
          <select
            className="text-base bg-transparent"
            {...register("workspace_id")}
            value={workspace?.id}
          >
            {workspaces.map((space) => (
              <option
                key={space.id}
                value={space.id}
                className="text-[#a4a4a4]"
              >
                {space.name}
              </option>
            ))}
          </select>
        </Label>
        {isFetching ? (
          <Skeleton className="w-full h-[40px] rounded-xl" />
        ) : (
          <Label className="flex flex-col gap-y-2">
            <p>Folders in this workspace</p>
            {isFolders && isFolders.length > 0 ? (
              <select
                className=" text-base bg-transparent"
                {...register("folder_id")}
              >
                {isFolders.map((folder, index) =>
                  index === 0 ? (
                    <option
                      key={folder.id}
                      className="text-[#a4a4a4]"
                      value={folder.id}
                    >
                      {folder.name}
                    </option>
                  ) : (
                    <option
                      key={folder.id}
                      className="text-[#a4a4a4]"
                      value={folder.id}
                    >
                      {folder.name}
                    </option>
                  )
                )}
              </select>
            ) : (
              <p className="text-[#a4a4a4] text-sm">
                This workspace has no folders
              </p>
            )}
          </Label>
        )}
      </div>
      <Button>
        <Loader state={isPending} color="#000">
          Transfer
        </Loader>
      </Button>
    </form>
  );
};

export default ChangeVideoLocation;
