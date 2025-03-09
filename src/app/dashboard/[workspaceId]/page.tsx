/* eslint-disable @typescript-eslint/no-unused-vars */
import CreateWorkSpace from "@/components/global/create-workspace";
import { Table } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

type Props = {
  params: {
    workspaceId: string;
  };
};

const WorkSpace = ({ params }: Props) => {
  return (
    <div>
      <Tabs defaultValue="videos" className="mt-6">
        <div className="flex w-full justify-between items-center">
          <TabsList className="bg-transparent gap-2 pl-0">
            <TabsTrigger
              value="videos"
              className="p-[13px] px-6 rounded-full data-[state=active]"
            >
              Videos
            </TabsTrigger>
            <TabsTrigger
              value="archive"
              className="p-[13px] px-6 rounded-full data-[state=active]"
            >
              Archive
            </TabsTrigger>
          </TabsList>
          <div className="flex gap-x-3 ">
            <CreateWorkSpace />
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default WorkSpace;
