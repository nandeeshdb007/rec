"use server";

import { useSeacrh } from "@/hooks/useSearch";

const WorkSpaceSearch = ({ workspaceId }: { workspaceId: string }) => {
  const { query, onSearchQuery, isFetching, onUsers } = useSeacrh(
    "get-workspace",
    "WORKSPACE"
  );
  return <div></div>;
};

export default WorkSpaceSearch;
