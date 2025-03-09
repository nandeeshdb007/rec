import {
  Enabled,
  QueryFunction,
  QueryKey,
  useQuery,
  useMutationState,
  MutationKey,
} from "@tanstack/react-query";

export const useQueryData = (
  queryKey: QueryKey,
  queryFn: QueryFunction,
  enabled?: Enabled
) => {
  const { data, isPending, isFetched, refetch, isFetching } = useQuery({
    queryKey,
    queryFn,
    enabled,
  });

  return { data, isFetched, isPending, refetch, isFetching };
};

export const useMutationDataState = (mutationKey: MutationKey) => {
  const data = useMutationState({
    filters: { mutationKey },
    select: (mutation) => {
      return {
        variables: mutation.state.variables as any,
        status: mutation.state.status,
      };
    },
  });
  const latestVariable = data[data.length - 1];
  return { latestVariable };
};
