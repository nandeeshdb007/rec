export type WorkspaceProps = {
  data: {
    subscription: {
      plan: "FREE" | "PRO";
    } | null;

    workSpace: {
      id: string;
      name: string;
      type: "PERSONAL" | "PUBLIC";
    }[];
    members: {
      Workspace: {
        id: string;
        name: string;
        type: "PUBLIC" | "PERSONAL";
      };
    }[];
  };
};
