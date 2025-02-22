import { createSlice } from "@reduxjs/toolkit";

export interface SidebarState {
  isOpen: boolean;
}

const initialState: SidebarState = {
  isOpen: true,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    closeSidebar: (state) => {
      state.isOpen = false;
    },
    openSidebar: (state) => {
      state.isOpen = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openSidebar, closeSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
