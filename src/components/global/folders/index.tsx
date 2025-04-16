"use client";
import { useMutationDataState, useQueryData } from "@/hooks/useQueryData";
import React from "react";
import { FolderDuotone } from "@/components/icons/folder-duotone";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Folder from "./folder";
import { getWorkspaceFolders } from "@/actions/workspace";
import { FoldersProps } from "@/types/index.types";
import { useDispatch } from "react-redux";
import { FOLDERS } from "@/redux/slices/folders";

type Props = {
  workspaceId: string;
};

const Folders = ({ workspaceId }: Props) => {
  const dispatch = useDispatch();
  const { data, isFetched } = useQueryData(["workspace-folders"], () =>
    getWorkspaceFolders(workspaceId)
  );

  const { latestVariable } = useMutationDataState(["create-folder"]);

  const { data: folders, status } = data as FoldersProps;

  if (isFetched && folders) {
    dispatch(FOLDERS({ folders }));
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FolderDuotone />
          <h2 className="text-[#8d8d8d] text-xl">Folders</h2>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-[#8d8d8d] text-xl">See all</p>
          <ArrowRight color="#707070" />
        </div>
      </div>
      <section
        className={cn(
          status !== 200 && "justify-center",
          "flex items-center gap-4 overflow-x-auto w-full"
        )}
      >
        {status !== 200 ? (
          <p className="text-neutral-300">No folders in workspace</p>
        ) : (
          <>
            {latestVariable && latestVariable.status === "pending" && (
              <Folder
                name={latestVariable.variables.name}
                id={latestVariable.variables.id}
                optimistic
              />
            )}
            {folders.map((folder) => (
              <Folder
                name={folder.name}
                count={folder._count.videos}
                id={folder.id}
                key={folder.id}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default Folders;
