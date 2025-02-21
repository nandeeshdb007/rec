import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const DashboardPage = async (props: Props) => {
  const auth = await onAuthenticateUser();
  if(auth.status === 200 || auth.status === 201) {
    return redirect(`/dashboard/${auth.user?.firstName}${auth.user?.lastName}`);
  }
  if(auth.status === 400){
    return redirect(`/auth/sign-in`);
  }
  return <div>DashboardPage</div>;
};

export default DashboardPage;
