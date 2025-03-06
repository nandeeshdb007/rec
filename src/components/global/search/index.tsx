"use server";

import { useSeacrh } from "@/hooks/useSearch";

const Search = ({ workspaceId }: { workspaceId: string }) => {
  const { query, onSearchQuery, isFetching, onUsers } = useSeacrh(
    "get-workspace",
    "USERS"
  );
  return <div></div>;
};

export default Search;
