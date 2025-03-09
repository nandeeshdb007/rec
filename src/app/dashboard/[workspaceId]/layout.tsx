import { getNotifications, onAuthenticateUser } from "@/actions/user";
import {
  getAllUserVideos,
  getWorkspaceFolders,
  getWorkspaces,
  verifyAccessToWorkspace,
} from "@/actions/workspace";
import { redirect } from "next/navigation";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import SideBar from "@/components/global/sidebar";
import GlobalHeader from "@/components/global/global-header";

const WorkspaceIdLayout = async ({
  children,
  params: { workspaceId },
}: {
  children: React.ReactNode;
  params: {
    workspaceId: string;
  };
}) => {
  const auth = await onAuthenticateUser();
  if (!auth?.user?.workSpace || !auth?.user?.workSpace.length)
    redirect("/auth/sign-in");

  const hasAccess = await verifyAccessToWorkspace(workspaceId);

  if (hasAccess.status !== 200) {
    redirect(`/dashboard/${auth.user.workSpace[0].id}`);
  }
  if (!hasAccess.data?.workspace) return null;

  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ["workspace-folders"],
    queryFn: () => getWorkspaceFolders(workspaceId),
  });

  await query.prefetchQuery({
    queryKey: ["user-videos"],
    queryFn: () => getAllUserVideos(workspaceId),
  });

  await query.prefetchQuery({
    queryKey: ["user-workspaces"],
    queryFn: () => getWorkspaces(),
  });

  await query.prefetchQuery({
    queryKey: ["user-notifications"],
    queryFn: () => getNotifications(),
  });
  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="flex h-screen w-screen">
        <SideBar activeWorkspaceId={workspaceId} />
        <div className="w-full pt-20 p-6 overflow-auto">
          <GlobalHeader workSpace={hasAccess.data.workspace} />
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default WorkspaceIdLayout;
