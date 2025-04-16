import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";

const CallBackPage = async () => {
  const auth = await onAuthenticateUser();
  
  if (auth.status === 200 || auth.status === 201) {
    return redirect(`/dashboard/${auth.user?.workSpace[0].id}`);
  }
  if (auth.status === 400) {
    return redirect(`/auth/sign-in`);
  }
};

export default CallBackPage;
