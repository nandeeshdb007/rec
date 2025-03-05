/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from "react";
import { useQueryData } from "./useQueryData";
import { searchWorkSpace } from "@/actions/user";

export const useSeacrh = (key: string, type: "WORKSPACE") => {
  const [query, setQuery] = useState("");
  const [debounce, setDebounce] = useState("");

  const [onUsers, setOnUsers] = useState<
    | {
        id: string;
        subcription: {
          plan: "PRO" | "FREE";
        } | null;
        firstName: string | null;
        lastName: string | null;
        email: string | null;
      }[]
    | undefined
  >(undefined);

  const onSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const delayInputTimeOut = setTimeout(() => {
      setDebounce(query);
    }, 1000);
    return () => clearTimeout(delayInputTimeOut);
  }, [query]);

  const { refetch, isFetching } = useQueryData(
    [key, debounce],
    async ({ queryKey }) => {
      if (type === "WORKSPACE") {
        const workSpace = await searchWorkSpace(queryKey[1] as string);
        if (workSpace.status === 200) setOnUsers(workSpace.data);
      }
    },
    false
  );

  useEffect(() => {
    if (debounce) refetch();
    if (!debounce) setOnUsers(undefined);
    return () => {
      debounce;
    };
  }, [debounce]);

  return { onSearchQuery, query, isFetching, onUsers };
};
