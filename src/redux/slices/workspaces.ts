import { createSlice } from "@reduxjs/toolkit";

type initialStateProps = {
  workspaces: {
    type: "PERSONAL" | "PUBLIC";
    name: string;
    id: string;
  }[];
};

const initialState: initialStateProps = {
  workspaces: [],
};

export const workspacesSlice = createSlice({
  name: "workspaces",
  initialState,
  reducers: {
    WORKSPACES: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const { WORKSPACES } = workspacesSlice.actions;
export default workspacesSlice.reducer;