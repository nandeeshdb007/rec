import { FormGenerator } from "@/components/global/form-generator";
import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { useCreateWorkSpaceHook } from "@/hooks/useCreateWorkSpaceHook";
import React from "react";

const WorkSpaceForm = () => {
  const { errors, isPending, onFormSubmit, register } =
    useCreateWorkSpaceHook();
  return (
    <form onSubmit={onFormSubmit} className="flex flex-col gap-y-3">
      <FormGenerator
        name="name"
        placeholder="Workspace Name"
        label="Workspace Name"
        errors={errors}
        inputType="input"
        type="text"
        register={register}
      />
      <Button
        className="text-sm w-full mt-2 bg-white text-black hover:bg-black hover:text-white"
        type="submit"
        disabled={isPending}
      >
        <Loader state={isPending}>Create WorkSpace</Loader>
      </Button>
    </form>
  );
};

export default WorkSpaceForm;
