"use client";
import { getWorkspaces } from "@/actions/workspace";
import { useQueryData } from "@/hooks/useQueryData";
import React from "react";
import Modal from "../modal";
import { Button } from "@/components/ui/button";
import { FolderPlusIcon } from "lucide-react";
import WorkSpaceForm from "@/components/forms/workspace-form";

const CreateWorkSpace = () => {
  const { data } = useQueryData(["user-workspaces"], getWorkspaces);
  const { data: plan } = data as {
    status: number;
    data: {
      subscription: {
        plan: "PRO" | "FREE";
      } | null;
    };
  };

  if (plan.subscription?.plan === "PRO") {
    return (
      <Modal
        title="Create a workspace"
        description="Workspaces helps you collabrate with team members.
    You are assigned a default personal workspace where you can share videos in provate 
    with yourself."
        trigger={
          <Button className="bg-white text-black hover:bg-black hover:text-white  flex items-center gap-2 py-6 px-4 rounded-2xl">
            <FolderPlusIcon size={30} />
            Create a workspce
          </Button>
        }
      >
        <WorkSpaceForm />
      </Modal>
    );
  }
};

export default CreateWorkSpace;
