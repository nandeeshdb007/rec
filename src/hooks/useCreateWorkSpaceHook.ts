import { useMutationData } from "./useMutationData";
import { createWorkSpace } from "@/actions/workspace";
import useZodForm from "./useZodSchema";
import { workspaceSchema } from "@/components/global/search/schema";

export const useCreateWorkSpaceHook = () => {
  const { mutate, isPending } = useMutationData(
    ["create-workspace"],
    (data: { name: string }) => createWorkSpace(data.name),
    "user-workspaces"
  );

  const { errors, onFormSubmit, register } = useZodForm(
    workspaceSchema,
    mutate
  );
  return { errors, onFormSubmit, register, isPending };
};
