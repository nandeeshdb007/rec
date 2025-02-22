import Spinner from "@/components/ui/global/loader/spinner";
import React from "react";

const AuthLoading = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <Spinner />
    </div>
  );
};

export default AuthLoading;
